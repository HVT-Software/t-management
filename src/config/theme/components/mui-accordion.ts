import type { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiAccordion: Components<CssVarsTheme>['MuiAccordion'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: 'transparent',
      '&.Mui-expanded': {
        boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.16)',
        borderRadius: 8,
        backgroundColor: theme.vars.palette.background.paper
      },
      '&.Mui-disabled': {
        backgroundColor: 'transparent'
      }
    })
  }
};
export const MuiAccordionSummary: Components<CssVarsTheme>['MuiAccordionSummary'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      paddingLeft: '16px',
      paddingRight: '8px',
      '&.Mui-disabled': {
        opacity: 1,
        color: theme.vars.palette.action.disabled,
        '& .MuiTypography-root': {
          color: 'inherit'
        }
      }
    }),
    expandIconWrapper: {
      color: 'inherit'
    }
  }
};
