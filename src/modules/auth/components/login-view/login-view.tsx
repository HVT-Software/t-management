'use client';

import { Typography, useMediaQuery } from '@mui/material';

import { LoginIllustration, StyledStack } from './login-view.styles';

interface LoginViewProps {
  isFromMobile: boolean;
}

const TITLE = 'Chào mừng trở lại!';

const LoginView: React.FC<LoginViewProps> = ({ isFromMobile }) => {
  const isDesktop = useMediaQuery('(min-width: 767px)', { defaultMatches: !isFromMobile });

  return (
    isDesktop && (
      <StyledStack direction='column' alignItems='center' justifyContent='center'>
        <Typography typography='h2'>{TITLE}</Typography>
        <LoginIllustration />
      </StyledStack>
    )
  );
};

export default LoginView;
