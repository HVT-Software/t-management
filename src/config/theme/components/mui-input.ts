import { ExpandMoreRounded } from '@mui/icons-material';
import { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiInput: Components<CssVarsTheme>['MuiInput'] = {
  styleOverrides: {
    underline: ({ theme }) => ({
      '&:before': {
        borderBottom: `1px solid rgba(${theme.vars.palette.common.onBackgroundChannel} / ${theme.vars.opacity.inputUnderline})`
      },
      '&:after': {
        borderBottomColor: `2px solid ${theme.vars.palette.primary.main}`
      }
    })
  }
};

export const MuiInputBase: Components<CssVarsTheme>['MuiInputBase'] = {
  styleOverrides: {
    root: {
      '&.Mui-disabled': {
        '& svg': {
          color: '#919EAB'
        }
      }
    },
    input: ({ theme }) => ({
      lineHeight: 1.5714285714285714,
      fontSize: '0.875rem',
      fontWeight: 400,
      height: 'auto',
      '&::placeholder': {
        opacity: 1,
        color: theme.vars.palette.text.disabled
      }
    })
  }
};

export const MuiOutlinedInput: Components<CssVarsTheme>['MuiOutlinedInput'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.vars.palette.text.primary
        }
      },
      '&.Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.vars.palette.error.main
        }
      },
      '&.Mui-disabled': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.vars.palette.action.disabledBackground
        }
      }
    }),
    input: ({ theme }) => ({
      '&:-webkit-autofill': {
        WebkitBoxShadow: 'none',
        WebkitTextFillColor: theme.vars.palette.text.primary,
        caretColor: theme.vars.palette.text.primary
      }
    }),
    notchedOutline: ({ theme }) => ({
      borderColor: `rgba(${theme.vars.palette.grey['500Channel']} / 0.2)`,
      transition: 'border-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    })
  }
};

export const MuiFilledInput: Components<CssVarsTheme>['MuiFilledInput'] = {
  defaultProps: {
    disableUnderline: true
  },
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: 8,
      backgroundColor: `rgba(${theme.vars.palette.grey['500Channel']} / 0.08)`,
      '&:hover': {
        backgroundColor: `rgba(${theme.vars.palette.grey['500Channel']} / 0.16)`
      },
      '&.Mui-focused': {
        backgroundColor: `rgba(${theme.vars.palette.grey['500Channel']} / 0.16)`
      },
      '&.Mui-error': {
        backgroundColor: `rgba(${theme.vars.palette.error.mainChannel} / 0.08)`,
        '&.Mui-focused': {
          backgroundColor: `rgba(${theme.vars.palette.error.mainChannel} / 0.16)`
        }
      },
      '&.Mui-disabled': {
        backgroundColor: theme.vars.palette.action.disabledBackground
      }
    })
  }
};

export const MuiFormHelperText: Components['MuiFormHelperText'] = {
  defaultProps: {
    component: 'div'
  },
  styleOverrides: {
    root: {
      marginTop: '8px'
    }
  }
};

export const MuiSelect: Components<CssVarsTheme>['MuiSelect'] = {
  defaultProps: {
    IconComponent: ExpandMoreRounded
  }
};
export const MuiInputLabel: Components<CssVarsTheme>['MuiInputLabel'] = {
  styleOverrides: {
    asterisk: ({ theme }) => ({
      color: theme.vars.palette.error.main
    })
  }
};
