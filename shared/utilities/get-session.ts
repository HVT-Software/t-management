import { authConfig } from '@config/auth/auth-options';
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
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    session: serverSessionCallback
  }
};

export const getSession = () => getServerSession(serverOptions);
