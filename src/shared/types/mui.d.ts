import { CssVarsTheme } from '@mui/material/styles';
import { CustomShadow } from '@mui/material/styles/shadows';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { UseMediaQueryOptions } from '@mui/material/useMediaQuery';
import type {} from '@mui/x-date-pickers/themeAugmentation';

declare module '@mui/material/styles/shadows' {
  export interface CustomShadow {
    z1: string;
    z4: string;
    z8: string;
    z12: string;
    z16: string;
    z20: string;
    z24: string;
    card: string;
    dropdown: string;
    dialog: string;
    primary: string;
    info: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
  }
}

declare module '@mui/material/styles' {
  export { type CustomShadow } from '@mui/material/styles/shadows';
  export interface PaletteOptions {
    shadowChannel?: string;
  }

  export interface Palette {
    shadowChannel: string;
  }
  export interface TypeBackground {
    neutral: string;
    neutralChannel: string;
  }

  export interface ChannelColor {
    '50Channel': string;
    '100Channel': string;
    '200Channel': string;
    '300Channel': string;
    '400Channel': string;
    '500Channel': string;
    '600Channel': string;
    '700Channel': string;
    '800Channel': string;
    '900Channel': string;
  }
  export interface CssVarsPalette {
    grey: ChannelColor;
  }

  export interface ThemeOptions {
    customShadows: CustomShadow;
  }
  export interface CssVarsThemeOptions {
    customShadows: CustomShadow;
  }
  export interface ThemeVars {
    customShadows: CustomShadow;
  }
}

// declare module '@mui/material/styles/createThemeWithVars' {
//
//
//   // export interface CssVarsTheme {
//   //   customShadows: CustomShadow;
//   //   palette: CssVarsPalette & Palette;
//   // }
//
//
//

declare module '@emotion/react' {
  export interface Theme extends CssVarsTheme {}
}

declare module '@mui/system/useMediaQuery' {
  export default function useMediaQuery<Theme = CssVarsTheme>(
    queryInput: string | ((theme: Theme) => string),
    options?: UseMediaQueryOptions
  ): boolean;
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}

declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsVariantOverrides {
    soft: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    soft: true;
  }
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    transparent: true;
  }
}

declare module '@mui/material/Pagination' {
  export interface PaginationPropsColorOverrides {
    info: true;
    success: true;
    warning: true;
    error: true;
  }
  export interface PaginationPropsVariantOverrides {
    soft: true;
  }
}
