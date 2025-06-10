import { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiTabs: Components['MuiTabs'] = {
  defaultProps: {
    textColor: 'inherit',
    variant: 'scrollable',
    allowScrollButtonsMobile: true
  },
  styleOverrides: {
    indicator: {
      backgroundColor: 'currentcolor'
    },
    scrollButtons: {
      width: 48,
      borderRadius: '50%'
    }
  }
};

export const MuiTab: Components<CssVarsTheme>['MuiTab'] = {
  defaultProps: {
    disableRipple: true,
    iconPosition: 'start'
  },
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.vars.palette.text.primary,
      padding: 0,
      opacity: 1,
      minWidth: 48,
      minHeight: 48,
      fontWeight: 600,
      '&:not(:last-of-type)': {
        marginRight: '24px',
        '@media (min-width:600px)': {
          marginRight: '40px'
        }
      },
      '&:not(.Mui-selected)': {
        color: theme.vars.palette.text.secondary
      }
    })
  }
};
