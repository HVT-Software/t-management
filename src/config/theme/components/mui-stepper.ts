import { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiStepConnector: Components<CssVarsTheme>['MuiStepConnector'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      '&.Mui-active': {
        '& .MuiStepConnector-line': {
          borderColor: theme.vars.palette.primary.main
        }
      }
    }),
    line: ({ theme }) => ({
      borderColor: theme.palette.grey[500]
    })
  }
};
