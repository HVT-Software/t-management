import { Components, ComponentsPropsList, CssVarsTheme } from '@mui/material/styles';

export const MuiButton: Components<CssVarsTheme>['MuiButton'] = {
  defaultProps: {
    disableElevation: true,
    variant: 'contained',
    color: 'inherit'
  },
  styleOverrides: {
    root: {
      textTransform: 'capitalize',
      whiteSpace: 'nowrap'
    }
  },
  variants: [
    {
      props: { variant: 'contained', color: 'inherit' },
      style: ({ theme }) => {
        return {
          ...theme.applyStyles('light', {
            backgroundColor: theme.vars.palette.grey['800'],
            color: theme.vars.palette.common.white,
            '&:hover': {
              backgroundColor: theme.vars.palette.grey['700'],
              boxShadow: theme.vars.customShadows.z8
            }
          }),
          ...theme.applyStyles('dark', {
            backgroundColor: theme.vars.palette.common.white,
            color: theme.vars.palette.grey['800'],
            '&:hover': {
              backgroundColor: theme.vars.palette.grey['400'],
              boxShadow: theme.vars.customShadows.z8
            }
          })
        };
      }
    },
    {
      props: { variant: 'soft' },
      style: (props) => {
        const { theme, ownerState } = props as { theme: CssVarsTheme; ownerState: ComponentsPropsList['MuiButton'] };
        const { color = 'inherit' } = ownerState;
        if (color === 'inherit') {
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

export const MuiButtonGroup: Components<CssVarsTheme>['MuiButtonGroup'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      '& .MuiButton-root.MuiButtonGroup-firstButton:last-child': {
        borderTopRightRadius: theme.vars.shape.borderRadius,
        borderBottomRightRadius: theme.vars.shape.borderRadius
      },
      '& .MuiButton-root.MuiButtonGroup-lastButton:first-child': {
        borderTopLeftRadius: theme.vars.shape.borderRadius,
        borderBottomLeftRadius: theme.vars.shape.borderRadius
      }
    })
  }
};
