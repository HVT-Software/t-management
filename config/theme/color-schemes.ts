import type { ColorSystemOptions, SupportedColorScheme } from '@mui/material/styles';

import * as colors from './colors';

export const colorSchemes: Partial<Record<SupportedColorScheme, ColorSystemOptions>> = {
  light: {
    palette: {
      primary: colors.primary,
      secondary: colors.secondary,
      success: colors.success,
      warning: colors.warning,
      error: colors.error,
      info: colors.info,
      grey: colors.grey,
      text: colors.text,
      background: colors.background,
      action: colors.action,
      common: colors.common,
      shadowChannel: '145 158 171',
      TableCell: {
        border: 'var(--fms-palette-divider)'
      }
    },
    opacity: {
      inputPlaceholder: 0.42,
      inputUnderline: 0.42,
      switchTrackDisabled: 0.12,
      switchTrack: 0.38
    }
  },
  dark: {
    palette: {
      primary: colors.primary,
      secondary: colors.secondary,
      success: colors.success,
      warning: colors.warning,
      error: colors.error,
      info: colors.info,
      grey: colors.grey,
      text: colors.darkText,
      background: colors.darkBackground,
      action: colors.darkAction,
      common: colors.darkCommon,
      shadowChannel: '0 0 0',
      TableCell: {
        border: 'var(--fms-palette-divider)'
      }
    },
    opacity: {
      inputPlaceholder: 0.5,
      inputUnderline: 0.7,
      switchTrackDisabled: 0.2,
      switchTrack: 0.3
    }
  }
};
