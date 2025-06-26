import { type TypographyVariantsOptions } from '@mui/material/styles';

export const typography: TypographyVariantsOptions = {
  fontFamily: [
    'Be Vietnam Pro',
    '--apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    '"Helvetica Neue"',
    'Roboto',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"'
  ].join(', '),
  fontWeightBold: 600,
  fontWeightMedium: 500,
  fontWeightRegular: 400,
  htmlFontSize: 16,
  h1: {
    fontWeight: 800,
    lineHeight: 1.25,
    fontSize: '2.5rem',
    '@media (min-width:640px)': {
      fontSize: '3.25rem'
    },
    '@media (min-width:768px)': {
      fontSize: '3.625rem'
    },
    '@media (min-width:1024px)': {
      fontSize: '4rem'
    }
  },
  h2: {
    fontWeight: 800,
    lineHeight: 1.3333333333333333,
    fontSize: '2rem',
    '@media (min-width:640px)': {
      fontSize: '2.5rem'
    },
    '@media (min-width:768px)': {
      fontSize: '2.75rem'
    },
    '@media (min-width:1024px)': {
      fontSize: '3rem'
    }
  },
  h3: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: '1.5rem',
    '@media (min-width:640px)': {
      fontSize: '1.625rem'
    },
    '@media (min-width:760px)': {
      fontSize: '1.875rem'
    },
    '@media (min-width:1024px)': {
      fontSize: '2rem'
    }
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: '1.25rem',
    '@media (min-width:640px)': {
      fontSize: '1.25rem'
    },
    '@media (min-width:768px)': {
      fontSize: '1.5rem'
    },
    '@media (min-width:1024px)': {
      fontSize: '1.5rem'
    }
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: '1.125rem',
    '@media (min-width:640px)': {
      fontSize: '1.1875rem'
    },
    '@media (min-width:768px)': {
      fontSize: '1.25rem'
    },
    '@media (min-width:1024px)': {
      fontSize: '1.25rem'
    }
  },
  h6: {
    fontWeight: 700,
    lineHeight: 1.5555555555555556,
    fontSize: '1.0625rem',
    '@media (min-width:640px)': {
      fontSize: '1.125rem'
    },
    '@media (min-width:768px)': {
      fontSize: '1.125rem'
    },
    '@media (min-width:1024px)': {
      fontSize: '1.125rem'
    }
  },
  subtitle1: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: '1rem'
  },
  subtitle2: {
    fontWeight: 600,
    lineHeight: 1.5714285714285714,
    fontSize: '0.875rem'
  },
  body1: {
    lineHeight: 1.5,
    fontSize: '1rem',
    fontWeight: 400
  },
  body2: {
    lineHeight: 1.5714285714285714,
    fontSize: '0.875rem',
    fontWeight: 400
  },
  button: {
    fontWeight: 700,
    lineHeight: 1.7142857142857142,
    fontSize: '0.875rem',
    textTransform: 'unset'
  },
  caption: {
    lineHeight: 1.5,
    fontSize: '0.75rem',
    fontWeight: 400
  },
  fontSize: 14,
  fontWeightLight: 300
};
