import { Components, ComponentsPropsList, CssVarsTheme } from '@mui/material/styles';

export const MuiPagination: Components<CssVarsTheme>['MuiPagination'] = {
  styleOverrides: {
    text: ({ theme, ownerState }) => {
      const { color = 'standard' } = ownerState;
      let backgroundColor;
      if (color === 'standard') {
        backgroundColor = theme.vars.palette.text.primary;
      } else {
        backgroundColor = theme.vars.palette[color].main;
      }
      return {
        '& .MuiPaginationItem-root.Mui-selected': {
          backgroundColor,
          color: '#ffffff'
        }
      };
    },
    outlined: ({ theme, ownerState }) => {
      const { color = 'standard' } = ownerState;
      let backgroundColor;
      let border;
      if (color === 'standard') {
        backgroundColor = `rgba(${theme.vars.palette.grey['500Channel']} / 0.08)`;
        border = `1px solid ${theme.vars.palette.text.primary}`;
      } else {
        border = `1px solid rgba(${theme.vars.palette[color].mainChannel} / 0.5)`;
        backgroundColor = `rgba(${theme.vars.palette[color].mainChannel} / ${theme.vars.palette.action.activatedOpacity})`;
      }
      return {
        '& .MuiPaginationItem-root': {
          border: `1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / 0.23)`,
          '&.Mui-selected': {
            borderColor: 'currentColor!important',
            border,
            backgroundColor
          }
        }
      };
    }
  },
  variants: [
    {
      props: {
        variant: 'soft'
      },
      style: (props) => {
        const { theme, ownerState } = props as { theme: CssVarsTheme; ownerState: ComponentsPropsList['MuiButton'] };
        const { color = 'standard' } = ownerState;
        if (color === 'standard' || color === 'inherit') {
          return {
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: `rgba(${theme.vars.palette.grey['500Channel']} / 0.08)`,
              color: theme.palette.text.primary,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: `rgba(${theme.vars.palette.grey['500Channel']} / 0.16)`
              }
            }
          };
        }
        return {
          ...theme.applyStyles('dark', {
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: `rgba(${theme.vars.palette[color].mainChannel} / 0.08)`,
              color: theme.palette[color].light,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: `rgba(${theme.vars.palette[color].mainChannel} / 0.16)`
              }
            }
          }),
          ...theme.applyStyles('light', {
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: `rgba(${theme.vars.palette[color].mainChannel} / 0.08)`,
              color: theme.palette[color].dark,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: `rgba(${theme.vars.palette[color].mainChannel} / 0.16)`
              }
            }
          })
        };
      }
    }
  ]
};
