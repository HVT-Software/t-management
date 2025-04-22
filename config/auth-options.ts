import { LoginResponse } from "@/app/login/models/login-response";
import { CLOUD_AUTH_ENPOINT, CLOUD_AUTH_LOGIN_ENDPOINT } from "@/lib/constants/cloud-endpoint";
import { loginPath } from "@/lib/constants/routes";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || ""
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || ""
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" }
      },
      authorize: async credentials => {
        try {
          const payload = { ...credentials };
          console.log("process.env.API_URL", process.env.API_URL);
          const res = await axios.post<Result<LoginResponse> & { id: string }>(CLOUD_AUTH_LOGIN_ENDPOINT, payload, {
            baseURL: process.env.API_URL
          });
          console.log(res);

          return res.data;
        } catch (e) {
          console.log(e);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: loginPath
  },
  callbacks: {
    jwt: async ({ user, trigger, token, account }) => {
      if (account?.provider !== "credentials" && account) {
        const axiosConfig = {
          baseURL: process.env.API_URL,
          headers: {
            "Content-Type": "application/json",
            Authorization: `${account.provider === "google" ? "Bearer" : account.provider} ${account.id_token || account.access_token}`
          }
        };

        const payload = { ...user, username: user?.id };
        const res = await axios.post<Result<LoginResponse>>(`${CLOUD_AUTH_ENPOINT}/${account.provider}`, payload, axiosConfig);

        if (res?.status === 200 && res.data?.data && trigger === "signIn") {
          const data = res.data.data;
          token = {
            ...token,
            user: {
              email: data.email,
              name: data.name,
              image: data.image,
              username: data.username,
              merchantCode: data.merchantCode,
              merchantName: data.merchantName
            },
            token: data.token,
            refreshToken: data.refreshToken,
            expiredTime: data.expiredTime
          };
          return token;
        }
      }

      if (user?.data && trigger === "signIn") {
        token.token = user.data.token;
        token.refreshToken = user.data.refreshToken;
        token.expiredTime = user.data?.expiredTime;
        token.user = {
          name: user.data.name,
          merchantCode: user.data.merchantCode,
          merchantName: user.data.merchantName,
          image: user.data.image,
          username: user.data.username,
          email: user.data.email
        };
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
    redirect: async ({ url }) => {
      return url;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 86300
  },
  cookies: {}
};
