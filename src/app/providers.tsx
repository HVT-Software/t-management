'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { initLocaleForDayJs } from '@config/dayjs-config';
import { LocalizationProvider, type PickersLocaleText } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { viVN } from '@mui/x-date-pickers/locales';
import Toaster from '@shared/components/toaster';
import { TIMEZONE_COOKIE_NAME } from '@shared/constants/request';
import { getBrowserTimezone } from '@shared/helpers/get-browser-timezone';
import { MountPoint } from '@shared/utilities/async-ui';
import 'core-js/actual/array/at';
import 'core-js/actual/array/flat';
import 'dayjs/locale/vi';
import { SessionProvider } from 'next-auth/react';
import { useCookies } from 'next-client-cookies';
import { useEffect } from 'react';

const Init = () => {
  const cookies = useCookies();
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    cookies.set(TIMEZONE_COOKIE_NAME, getBrowserTimezone(), {
      sameSite: 'lax'
    });
  }, []);
  return null;
};

// Initialize locale for dayjs
initLocaleForDayJs();

const localeText: Partial<PickersLocaleText> = {
  ...viVN.components.MuiLocalizationProvider.defaultProps.localeText,
  okButtonLabel: 'Chọn'
};

const Providers: React.FC<WrappedComponentProps> = ({ children }) => {
  return (
    <>
      <SessionProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='vi' localeText={localeText}>
          <ProgressProvider height='3px' color='#00B8D9' options={{ showSpinner: false }} shallowRouting disableSameURL>
            {children}
            <Toaster />
            <MountPoint />
          </ProgressProvider>
        </LocalizationProvider>
      </SessionProvider>
      <Init />
    </>
  );
};

export default Providers;
