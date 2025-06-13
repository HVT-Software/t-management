import LoginForm from '@modules/auth/components/login-form/login-form';
import { LoginView } from '@modules/auth/components/login-view';
import ColorSchemeToggle from '@shared/components/color-scheme-toggle';
import { isFromMobileBrowser } from '@shared/helpers/is-from-mobile-browser';
import { getSession } from '@shared/utilities/get-session';
import dayjs from 'dayjs';
import { type Session } from 'next-auth';
import { redirect } from 'next/navigation';

import { categoriesPath } from '../../routes';

const LoginPage: React.FC = async () => {
  const session = (await getSession()) as Session;

  if (session?.token) {
    if (dayjs().isBefore(dayjs(session.expiredTime))) {
      return redirect(categoriesPath);
    }
  }

  const isFromMobile = await isFromMobileBrowser();

  return (
    <div className='h-full'>
      <main className='relative flex h-full'>
        <div className='absolute top-6 right-6'>
          <ColorSchemeToggle />
        </div>
        <LoginView isFromMobile={isFromMobile} />
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage;
