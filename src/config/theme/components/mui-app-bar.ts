import { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiAppBar: Components['MuiAppBar'] = {
  defaultProps: {
    color: 'transparent'
  },
  styleOverrides: {
    root: {
      boxShadow: 'none',
      backgroundColor: 'transparent',
      transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    }
  }
};

export const MuiToolbar: Components<CssVarsTheme>['MuiToolbar'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backdropFilter: 'blur(6px)',
      backgroundColor: `rgba(${theme.vars.palette.background.defaultChannel} / 0.6)`
    })
  }
};
