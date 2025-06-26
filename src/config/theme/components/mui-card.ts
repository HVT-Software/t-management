import { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiCard: Components<CssVarsTheme>['MuiCard'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      position: 'relative',
      boxShadow: theme.vars.customShadows.card,
      borderRadius: 16,
      zIndex: 0,
      backgroundImage: 'none'
    })
  }
};

export const MuiCardHeader: Components<CssVarsTheme>['MuiCardHeader'] = {
  defaultProps: {
    titleTypographyProps: {
      variant: 'h6'
    },
    subheaderTypographyProps: {
      variant: 'body2',
      marginTop: '4px'
    }
  },
  styleOverrides: {
    root: {
      padding: '16px 16px 0px'
    }
  }
};

export const MuiCardContent: Components<CssVarsTheme>['MuiCardContent'] = {
  styleOverrides: {
    root: {
      '&:last-child': {
        paddingBottom: '16px'
      }
    }
  }
};
