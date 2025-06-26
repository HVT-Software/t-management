import { CLOUD_AUTH_LOGIN_ENDPOINT } from '@shared/constants/routes.api';
import { LoginResponse } from '@shared/types/auth';
import axios from 'axios';
import type { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authConfig: AuthOptions = {
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: 'Basic Auth',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' }
      },
      authorize: async (credentials) => {
        try {
          // Create a separate axios instance for authentication to avoid circular dependency
          const authInstance = axios.create({
            baseURL: process.env.API_URL,
            headers: {
              'Content-Type': 'application/json'
            }
          });

          const res = await authInstance.post<Result<LoginResponse>>(CLOUD_AUTH_LOGIN_ENDPOINT, {
            username: credentials!.username,
            password: credentials!.password
          });

          if (res.data && res.status === 200) {
            // Return the login response data which matches the LoginResponse interface
            return {
              refreshToken: res.data.data.refreshToken,
              token: res.data.data.token,
              merchantCode: res.data.data.merchantCode,
              merchantName: res.data.data.merchantName,
              username: res.data.data.username,
              name: res.data.data.name,
              email: res.data.data.email,
              image: res.data.data.image,
              expiredTime: res.data.data.expiredTime,
              session: res.data.data.session
            } as User;
          }

          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    signIn: async ({ user }) => {
      if (typeof user === 'string') {
        throw new Error(user);
      }
      return true;
    },
    jwt: async ({ user, trigger, token }) => {
      if (user && trigger === 'signIn') {
        token.token = user.token;
        token.refreshToken = user.refreshToken;
        token.username = user.username;
        token.expiredTime = user.expiredTime;
        token.user = {
          merchantCode: user.merchantCode,
          merchantName: user.merchantName,
          username: user.username,
          name: user.name || '',
          email: user.email || '',
          image: user.image || '',
          expiredTime: user.expiredTime,
          session: user.session,
          refreshToken: user.refreshToken
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      session.token = token.token;
      session.refreshToken = token.refreshToken;
      session.expiredTime = token.expiredTime;
      session.username = token.username;
      return session;
    },
    redirect: async ({ url }) => {
      return url;
    }
  },
  session: {
    maxAge: 86300
  },
  cookies: {}
};
