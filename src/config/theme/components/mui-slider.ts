import { CssVarsTheme, Components } from '@mui/material/styles';

export const MuiSlider: Components<CssVarsTheme>['MuiSlider'] = {
  defaultProps: {
    size: 'small'
  },
  styleOverrides: {
    root: {
      '&.Mui-disabled': {
        color: 'rgba(145, 158, 171, 0.8)'
      },
      '& .MuiSlider-thumb': {
        transform: 'translate(-50%, -50%)'
      }
    },
    rail: {
      opacity: 0.32
    },
    markLabel: {
      fontSize: 13,
      color: '#919EAB'
    },
    valueLabel: ({ theme }) => ({
      borderRadius: 8,
      backgroundColor: theme.vars.palette.grey[800]
    })
  }
};
