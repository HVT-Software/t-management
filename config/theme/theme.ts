'use client';

import { createTheme } from '@mui/material/styles';

import { colorSchemes } from './color-schemes';
import * as components from './components';
import { customShadows, shadows } from './shadows';
import { typography } from './typography';

export const theme = createTheme({
  cssVariables: {
    cssVarPrefix: 'fms',
    colorSchemeSelector: 'data-theme'
  },
  colorSchemes,
  typography,
  customShadows,
  defaultColorScheme: 'light',
  shadows,
  components,
  shape: {
    borderRadius: 8
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  }
});
