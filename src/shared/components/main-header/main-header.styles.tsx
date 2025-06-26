'use client';

import styled from '@emotion/styled';
import { AppBar, Toolbar } from '@mui/material';
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_COLLAPSED } from '@shared/constants/ui';

import { SIDEBAR_COLLAPSED } from '../navigation/navigation.constants';
import { DESKTOP_HEADER_HEIGHT, MOBILE_HEADER_HEIGHT } from './main-header.constants';

export const StyledAppBar = styled(AppBar)`
  position: fixed;
  top: 0;
  transition: all 0.15s ${({ theme }) => theme.transitions.easing.sharp};
  padding-right: 0 !important;

  & + main {
    margin-top: calc(${MOBILE_HEADER_HEIGHT}px + 2px);
  }
  left: 0;
  flex-shrink: 0;

  ${({ theme }) => theme.breakpoints.up('md')} {
    left: ${SIDEBAR_WIDTH}px;
    width: calc(100vw - ${SIDEBAR_WIDTH}px);
    .${SIDEBAR_COLLAPSED} ~ div.main > & {
      width: calc(100vw - ${SIDEBAR_WIDTH_COLLAPSED}px);
      left: ${SIDEBAR_WIDTH_COLLAPSED}px;
    }
    & + main {
      margin-top: calc(${DESKTOP_HEADER_HEIGHT}px + 2px);
    }
  }
`;

export const StyledToolbar = styled(Toolbar)`
  transition: ${({ theme }) =>
    theme.transitions.create('height', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.sharp,
      delay: 0
    })};
  height: ${MOBILE_HEADER_HEIGHT}px;
  ${({ theme }) => theme.breakpoints.up('md')} {
    height: ${DESKTOP_HEADER_HEIGHT}px;
  }
  display: flex;
  justify-content: space-between;
`;
