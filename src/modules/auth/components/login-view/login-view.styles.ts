import { Stack, styled } from '@mui/material';
import IllustrationLoginDark from '@shared//assets/illustrations/illustration-login-dark.png';
import IllustrationLogin from '@shared/assets/illustrations/illustration-login.png';
import Overlay from '@shared/assets/images/overlay-2.png';
import DarkOverlay from '@shared/assets/images/overlay-5.png';

export const StyledStack = styled(Stack)`
  height: 100%;

  background-position: center center;
  ${({ theme }) =>
    theme.applyStyles('light', {
      background: `linear-gradient(rgba(${theme.vars.palette.background.defaultChannel} / 0.88), rgba(${theme.vars.palette.background.defaultChannel} / 0.88)) center center / cover no-repeat, url(${Overlay.src}) center center / cover no-repeat`
    })}

  ${({ theme }) =>
    theme.applyStyles('dark', {
      background: `linear-gradient(rgba(${theme.vars.palette.background.defaultChannel} / 0.5), rgba(${theme.vars.palette.background.defaultChannel} / 0.5)) center center / cover no-repeat, url(${DarkOverlay.src}) center center / cover no-repeat`
    })}

  flex-grow: 1;
  gap: 16px;
`;

export const LoginIllustration = styled('div')`
  width: 420px;
  height: 420px;
  background-position: center center;
  background-size: cover;

  ${({ theme }) => theme.breakpoints.up('lg')} {
    width: 560px;
    height: 560px;
  }

  ${({ theme }) => theme.breakpoints.up('xl')} {
    max-width: 720px;
    max-height: 720px;
  }

  ${({ theme }) =>
    theme.applyStyles('light', {
      backgroundImage: `url(${IllustrationLogin.src})`
    })}

  ${({ theme }) =>
    theme.applyStyles('dark', {
      backgroundImage: `url(${IllustrationLoginDark.src})`
    })}
`;
