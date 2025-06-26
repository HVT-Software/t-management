'use client';

import { styled } from '@mui/material';
import Overlay from '@shared/assets/images/overlay-4.png';

export const FormBox = styled('div')`
  margin: 0 auto;
  height: fit-content;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: ${({ theme }) => theme.spacing(4, 2)};
    background-color: ${({ theme }) => theme.vars.palette.background.default};
    border-radius: ${({ theme }) => theme.spacing(2)};
    margin: ${({ theme }) => theme.spacing(10, 2, 0)};
  }

  &::before {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    content: '';
    position: absolute;

    background: ${({ theme }) =>
      `linear-gradient(rgba(${theme.vars.palette.background.defaultChannel} / 0.88), rgba(${theme.vars.palette.background.defaultChannel} / 0.5)) center center / cover no-repeat, url(${Overlay.src}) center center / cover no-repeat`};
    opacity: 0.24;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    padding: ${({ theme }) => theme.spacing(15, 2)};
    max-width: 480px;
    &::before {
      display: none;
      content: none;
    }
    padding-top: ${({ theme }) => theme.spacing(24)};
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    padding-left: ${({ theme }) => theme.spacing(8)};
    padding-right: ${({ theme }) => theme.spacing(8)};
  }
`;
