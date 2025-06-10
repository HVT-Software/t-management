import { authOptions } from '@config/auth-options';
import { type CallbacksOptions, getServerSession } from 'next-auth';

const serverSessionCallback: CallbacksOptions['session'] = async ({ session, token }) => {
  session.user = token.user;
  session.token = token.token;
  session.refreshToken = token.refreshToken;
  session.expiredTime = token.expiredTime;
  session.username = token.username;
  return session;
};

const serverOptions = {
  ...authOptions,
  callbacks: {
    ...authOptions.callbacks,
    session: serverSessionCallback
  }
};

export const getSession = () => getServerSession(serverOptions);
