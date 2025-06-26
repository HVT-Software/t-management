import { Components, CssVarsTheme } from '@mui/material/styles';
import CyanBlur from '@shared//assets/images/cyan-blur.png';
import RedBlur from '@shared/assets/images/red-blur.png';

export const MuiDrawer: Components<CssVarsTheme>['MuiDrawer'] = {
  styleOverrides: {
    paper: ({ ownerState: { variant }, theme }) => ({
      boxShadow: `rgba(${theme.vars.palette.shadowChannel} / 0.24) 40px 40px 80px -8px`,
      backdropFilter: 'blur(20px)',
      backgroundColor: `rgba(${theme.vars.palette.background.paperChannel} / 0.9)`,
      backgroundImage: variant === 'temporary' ? `url(${CyanBlur.src}), url(${RedBlur.src})` : '',
      backgroundSize: '50% 50%',
      backgroundRepeat: 'no-repeat no-repeat',
      backgroundPosition: 'right top, left bottom',
      minWidth: 200
    })
  }
};

export const MuiBackdrop: Components<CssVarsTheme>['MuiBackdrop'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: `rgba(${theme.vars.palette.grey['800Channel']} / 0.48)`
    }),
    invisible: {
      background: 'transparent'
    }
  }
};
