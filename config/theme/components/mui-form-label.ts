import { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiFormLabel: Components<CssVarsTheme>['MuiFormLabel'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      lineHeight: 1.5714285714285714,
      fontSize: '0.875rem',
      fontWeight: 400,
      color: '#919EAB',
      '&.MuiInputLabel-shrink': {
        lineHeight: 1.5,
        fontSize: '1rem',
        fontWeight: 600,
        color: theme.vars.palette.text.secondary,
        '&.Mui-focused': {
          color: theme.vars.palette.text.primary
        },
        '&.Mui-error': {
          color: theme.vars.palette.error.main
        },
        '&.Mui-disabled': {
          color: theme.vars.palette.text.disabled
        },
        '&.MuiInputLabel-filled': {
          transform: 'translate(12px, 6px) scale(0.75)'
        }
      }
    })
  }
};
