import { Components, CssVarsTheme } from '@mui/material/styles';
import CyanBlur from '@shared//assets/images/cyan-blur.png';
import RedBlur from '@shared/assets/images/red-blur.png';

export const MuiMenuItem: Components<CssVarsTheme>['MuiMenuItem'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      lineHeight: 1.5714285714285714,
      fontSize: '0.875rem',
      fontWeight: 500,
      padding: '6px 8px',
      borderRadius: 6,
      color: theme.vars.palette.text.secondary,
      '&:not(:last-of-type)': {
        marginBottom: 4
      },
      '&.Mui-selected': {
        color: theme.vars.palette.text.primary,
        fontWeight: 600,
        backgroundColor: theme.vars.palette.action.selected,
        '&:hover': {
          backgroundColor: theme.vars.palette.action.hover
        }
      },
      '& .MuiCheckbox-root': {
        padding: '4px',
        marginLeft: '-4px',
        marginRight: '4px'
      },
      '&.MuiAutocomplete-option[aria-selected="true"]': {
        backgroundColor: theme.vars.palette.action.selected,

        '&:hover': {
          backgroundColor: theme.vars.palette.action.hover
        }
      },
      '&+.MuiDivider-root': {
        margin: '4px 0px'
      }
    })
  }
};

export const MuiPopover: Components<CssVarsTheme>['MuiPopover'] = {
  styleOverrides: {
    paper: ({ theme }) => ({
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      backgroundColor: `rgba(${theme.vars.palette.background.paperChannel} / 0.9)`,
      backgroundImage: `url(${CyanBlur.src}), url(${RedBlur.src})`,
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundPosition: 'top right, left bottom',
      backgroundSize: '50%, 50%',
      padding: '4px',
      boxShadow: `0 0 2px 0 rgba(${theme.vars.palette.shadowChannel} 0.24), -20px 20px 40px -4px rgba(${theme.vars.palette.shadowChannel}, 0.24)`,
      borderRadius: 10,
      '& .MuiList-root': {
        paddingTop: 0,
        paddingBottom: 0
      }
    })
  }
};

export const MuiPopper: Components<CssVarsTheme>['MuiPopper'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      '& .MuiPaper-root': {
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: `rgba(${theme.vars.palette.background.paperChannel} / 0.9)`,
        backgroundImage: `url(${CyanBlur.src}), url(${RedBlur.src})`,
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundPosition: 'top right, left bottom',
        backgroundSize: '50%, 50%',
        padding: '4px',
        boxShadow: `0 0 2px 0 rgba(${theme.vars.palette.shadowChannel} 0.24), -20px 20px 40px -4px rgba(${theme.vars.palette.shadowChannel}, 0.24)`,
        borderRadius: 10,
        '& .MuiList-root': {
          paddingTop: 0,
          paddingBottom: 0
        }
      }
    })
  }
};
