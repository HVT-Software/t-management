import dayjs from 'dayjs';

export const initLocaleForDayJs = (localeCode: string = 'vi') => {
  dayjs.locale(localeCode);
};
