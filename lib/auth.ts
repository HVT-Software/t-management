import { LoginResponse } from "@/app/login/models/login-response";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { CLOUD_AUTH_LOGIN_ENDPOINT } from "./constants/cloud-endpoint";

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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" }
      },
      authorize: async credentials => {
        try {
          const payload = {
            ...credentials
          };

          const res = await axios.post<Result<LoginResponse> & { id: string }>(CLOUD_AUTH_LOGIN_ENDPOINT, payload, {
            baseURL: process.env.API_URL
          });

          return res.data;
        } catch {
          return null;
        }
      }
    })
  ],
  callbacks: {
    // jwt: async ({ user, trigger, token, account }) => {
    //   if (account?.provider === "google") {
    //     // const axiosConfig = {
    //     //   baseURL: process.env.API_URL,
    //     //   headers: {
    //     //     "Content-Type": "application/json"
    //     //   }
    //     // };
    //     // Call the API with the username
    //     try {
    //       // const response = await axios.post<Result<LoginResponse>>(CLOUD_AUTH_ENPOINT, { token: account.id_token }, axiosConfig);
    //     } catch {
    //       console.error("Không thể kết nối đến Server");
    //     }
    //   } else if (user && trigger === "signIn") {
    //   }
    //   return token;
    // },
    // session: async ({ session, token }) => {
    //   // session.user = token.user;
    //   return session;
    // }
  }
};
