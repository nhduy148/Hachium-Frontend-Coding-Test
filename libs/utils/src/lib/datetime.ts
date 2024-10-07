import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/vi';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isToday from 'dayjs/plugin/isToday';
import localeData from 'dayjs/plugin/localeData';
import minMax from 'dayjs/plugin/minMax';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';

export const DATE_FORMAT = 'MM-DD-YYYY';
export const REVERSE_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
export const DATE_TIME_FORMAT = 'HH:mm MM-MM-YYYY';

export const formatDateTime = (time: any, isReverse = false) => {
  return datetime(time).format(isReverse ? REVERSE_DATE_TIME_FORMAT : DATE_TIME_FORMAT);
};

export const formatDate = (time: any) => {
  return datetime(time).format(DATE_FORMAT);
};

export const datetimeConfig = (locale: 'vi' | 'en') => {
  datetime.locale(locale);
  datetime.extend(localeData);
  datetime.extend(utc);
  datetime.extend(duration);
  datetime.extend(timezone);
  datetime.extend(isBetween);
  datetime.extend(isSameOrAfter);
  datetime.extend(isSameOrBefore);
  datetime.extend(minMax);
  datetime.extend(isToday);
  datetime.extend(customParseFormat);
  datetime.extend(relativeTime);
  datetime.extend(weekday);
};

export const datetime = dayjs;

export type Datetime = Dayjs;
