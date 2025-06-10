import { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiTableContainer: Components<CssVarsTheme>['MuiTableContainer'] = {
  styleOverrides: {
    root: {
      position: 'relative'
    }
  }
};

export const MuiTableRow: Components<CssVarsTheme>['MuiTableRow'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      boxShadow: 'none!important',
      '&.Mui-selected': {
        ...theme.applyStyles('dark', {
          backgroundColor: `rgba(${theme.vars.palette.primary.lightChannel} / 0.04)`,
          '&:hover': {
            backgroundColor: `rgba(${theme.vars.palette.primary.lightChannel} / 0.08)`
          }
        }),
        ...theme.applyStyles('light', {
          backgroundColor: `rgba(${theme.vars.palette.primary.darkChannel} / 0.04)`,
          '&:hover': {
            backgroundColor: `rgba(${theme.vars.palette.primary.darkChannel} / 0.08)`
          }
        })
      },
      '& .MuiTableCell-root::after': {
        backgroundColor: 'transparent'
      },
      '&:hover': {
        '& .MuiTableCell-root::after': {
          backgroundColor: 'transparent'
        }
      }
    })
  }
};

export const MuiTableCell: Components<CssVarsTheme>['MuiTableCell'] = {
  styleOverrides: {
    root: {
      fontWeight: 400,
      borderBottomStyle: 'dashed',
      '&[data-pinned="true"]': {
        zIndex: 10
      },
      ':before': {
        boxShadow: 'none!important'
      }
    },
    body: ({ theme }) => ({
      '&[data-pinned="true"]': {
        backgroundColor: theme.vars.palette.background.paper
      }
    }),

    head: ({ theme }) => ({
      fontSize: 14,
      color: theme.vars.palette.text.secondary,
      fontWeight: 600,
      backgroundColor: `${theme.vars.palette.background.neutral}!important`
    }),
    stickyHeader: ({ theme }) => ({
      backgroundColor: theme.vars.palette.background.paper
      // backgroundImage: `linear-gradient(to bottom, ${theme.vars.palette.background.neutral},  ${theme.vars.palette.background.neutral})`
    }),
    paddingCheckbox: {
      paddingLeft: '8px'
    }
  }
};
