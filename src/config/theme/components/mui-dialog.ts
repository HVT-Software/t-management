import { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiDialog: Components<CssVarsTheme>['MuiDialog'] = {
  styleOverrides: {
    paper: ({ theme }) => ({
      boxShadow: theme.vars.customShadows.dialog,
      borderRadius: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        width: '90%'
      },
      backgroundImage: 'none',
      transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)'
    })
  }
};

export const MuiDialogTitle = {
  styleOverrides: {
    root: {
      padding: '16px'
    }
  }
};

export const MuiDialogContent: Components['MuiDialogContent'] = {
  styleOverrides: {
    root: {
      padding: '0px 16px'
    },
    dividers: {
      borderTop: 0,
      borderBottomStyle: 'dashed',
      paddingBottom: '16px'
    }
  }
};

export const MuiDialogActions: Components['MuiDialogActions'] = {
  defaultProps: {
    disableSpacing: true
  },
  styleOverrides: {
    root: {
      padding: '16px',
      '& > :not(:first-of-type)': {
        marginLeft: '12px'
      }
    }
  }
};
