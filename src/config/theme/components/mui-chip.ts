import { Components, ComponentsPropsList, CssVarsTheme } from '@mui/material/styles';
import { createElement } from 'react';

export const MuiChip: Components<CssVarsTheme>['MuiChip'] = {
  defaultProps: {
    variant: 'soft',
    deleteIcon: createElement(
      'span',
      {
        className: 'i-solar-close-circle-bold-duotone h-4 w-4'
      },
      null
    )
  },
  styleOverrides: {
    root: {
      whiteSpace: 'nowrap',
      fontSize: '0.8125rem',
      fontWeight: 700,
      borderRadius: '0.5rem'
    }
  },
  variants: [
    {
      props: { variant: 'filled', color: 'default' },
      style: ({ theme }) => {
        return {
          backgroundColor: theme.vars.palette.text.primary,
          color: theme.vars.palette.common.white,
          '&:hover': {
            backgroundColor: theme.vars.palette.grey['700']
          }
        };
      }
    },
    {
      props: { variant: 'soft' },
      style: (props) => {
        const { theme, ownerState } = props as { theme: CssVarsTheme; ownerState: ComponentsPropsList['MuiChip'] };
        const { color = 'default' } = ownerState;
        if (color === 'default') {
          return {
            backgroundColor: `rgba(${theme.vars.palette.grey['500Channel']} / 0.16)`,
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: `rgba(${theme.vars.palette.grey['500Channel']} / 0.32)`
            }
          };
        }
        return {
          ...theme.applyStyles('light', {
            backgroundColor: `rgba(${theme.vars.palette[color].mainChannel} / 0.16)`,
            color: theme.vars.palette[color].dark,
            '&:hover': {
              backgroundColor: `rgba(${theme.vars.palette[color].mainChannel} / 0.32)`
            }
          }),
          ...theme.applyStyles('dark', {
            backgroundColor: `rgba(${theme.vars.palette[color].mainChannel} / 0.16)`,
            color: theme.vars.palette[color].light,
            '&:hover': {
              backgroundColor: `rgba(${theme.vars.palette[color].mainChannel} / 0.32)`
            }
          })
        };
      }
    }
  ]
};
