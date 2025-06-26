import { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiListItemText: Components<CssVarsTheme>['MuiListItemText'] = {
  defaultProps: {
    primaryTypographyProps: {
      typography: 'subtitle2'
    },
    secondaryTypographyProps: {
      // @ts-ignore
      component: 'span'
    }
  },
  styleOverrides: {
    root: {
      margin: 0
    },
    multiline: {
      margin: 0
    }
  }
};

export const MuiListItemIcon: Components<CssVarsTheme>['MuiListItemIcon'] = {
  styleOverrides: {
    root: {
      color: 'inherit',
      minWidth: 'auto',
      marginRight: '16px'
    }
  }
};

export const MuiListItemAvatar: Components<CssVarsTheme>['MuiListItemAvatar'] = {
  styleOverrides: {
    root: {
      minWidth: 'auto',
      marginRight: '16px'
    }
  }
};
