import { Components, CssVarsTheme } from '@mui/material/styles';
import { createElement } from 'react';

export const MuiAutocomplete: Components<CssVarsTheme>['MuiAutocomplete'] = {
  defaultProps: {
    popupIcon: createElement('span', { className: 'i-eva-arrow-ios-downward-outline w-4 h-4' }),
    clearIcon: createElement('span', { className: 'i-solar-close-circle-bold-duotone w-4 h-4' })
  },
  styleOverrides: {
    root: {
      '& span.MuiAutocomplete-tag': {
        fontWeight: 600,
        lineHeight: '24px',
        fontSize: '0.875rem',
        height: 24,
        minWidth: 24,
        textAlign: 'center',
        padding: '0px 6px',
        borderRadius: 8
      }
    },
    listbox: ({ theme }) => ({
      padding: 0,
      '&::-webkit-scrollbar': {
        width: 4
      },
      '& .MuiAutocomplete-option': {
        lineHeight: 1.5714285714285714,
        fontSize: '0.875rem',
        fontWeight: 400,
        padding: '6px 8px',
        borderRadius: 6,

        '&:not(:last-of-type)': {
          marginBottom: 4
        },
        '& .MuiCheckbox-root': {
          padding: '4px',
          marginLeft: '-4px',
          marginRight: '4px'
        },
        '&+.MuiDivider-root': {
          margin: '4px 0px'
        },
        '&[aria-selected="true"]': {
          backgroundColor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.6)!important`,
          '&:hover': {
            backgroundColor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.75)!important`
          }
        }
      }
    }),
    endAdornment: {
      '& .MuiSvgIcon-root': {
        width: 18,
        height: 18
      }
    }
  }
};
