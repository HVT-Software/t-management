import { type Components, CssVarsTheme } from '@mui/material/styles';
import { type DateOrTimeView, DateView } from '@mui/x-date-pickers';
import { createElement } from 'react';

const slots = {
  openPickerIcon: () => createElement('span', { className: 'i-solar-calendar-mark-bold-duotone h-5 w-5' }),
  leftArrowIcon: () => createElement('span', { className: 'i-eva-arrow-ios-back-outline h-5 w-5' }),
  rightArrowIcon: () => createElement('span', { className: 'i-eva-arrow-ios-forward-outline h-5 w-5' }),
  switchViewIcon: () => createElement('span', { className: 'i-eva-arrow-ios-downward-outline h-5 w-5' })
};

const slotProps: any = {
  openPickerButton: {
    tabIndex: -1
  }
};

const views: DateView[] = ['month', 'day'];
const timeViews: DateOrTimeView[] = ['month', 'day', 'hours', 'minutes'];
const defaultFormat = 'DD/MM/YYYY';
const defaultDateTimeFormat = 'DD/MM/YYYY HH:mm';

export const MuiDatePicker: Components<CssVarsTheme>['MuiDatePicker'] = {
  defaultProps: {
    slots,
    views,
    slotProps,
    format: defaultFormat
  }
};

export const MuiDateTimePicker: Components<CssVarsTheme>['MuiDateTimePicker'] = {
  defaultProps: {
    slots,
    views: timeViews,
    slotProps,
    format: defaultDateTimeFormat
  }
};

export const MuiStaticDatePicker: Components<CssVarsTheme>['MuiStaticDatePicker'] = {
  defaultProps: {
    slots,
    views,
    slotProps
  }
};

export const MuiDesktopDatePicker: Components<CssVarsTheme>['MuiDesktopDatePicker'] = {
  defaultProps: {
    slots,
    views,
    slotProps
  }
};

export const MuiDesktopDateTimePicker: Components<CssVarsTheme>['MuiDesktopDateTimePicker'] = {
  defaultProps: {
    slots,
    views: timeViews,
    slotProps
  }
};

export const MuiMobileDatePicker: Components<CssVarsTheme>['MuiMobileDatePicker'] = {
  defaultProps: {
    slots,
    views,
    slotProps
  }
};

export const MuiMobileDateTimePicker: Components<CssVarsTheme>['MuiMobileDateTimePicker'] = {
  defaultProps: {
    slots,
    views: timeViews,
    slotProps
  }
};

export const MuiMultiSectionDigitalClock: Components<CssVarsTheme>['MuiMultiSectionDigitalClock'] = {
  styleOverrides: {
    root: {
      '& .MuiMultiSectionDigitalClockSection-root': {
        '&::-webkit-scrollbar': {
          width: '4px'
        }
      }
    }
  }
};
