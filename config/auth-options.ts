import type { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: 'Basic Auth',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' },
        tenantCode: { type: 'text' }
      },
      authorize: async (credentials) => {
        const res = await authClient.login({
          tenantCode: credentials!.tenantCode,
          username: credentials!.username,
          password: credentials!.password
        });

        return res as unknown as User;
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
        token.username = user.username;
        token.user = {
          username: user.username,
          tenantName: user.tenantName
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
  session: {
    maxAge: 86300
  },
  cookies: {}
};
