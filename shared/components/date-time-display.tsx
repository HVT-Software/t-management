import { type Timestamp } from '@bufbuild/protobuf/wkt';
import { DATE_FORMAT, TIME_FORMAT } from '@config/date-time-format';
import { Typography } from '@mui/material';
import { fromTimestampToDayjs } from '@shared/utilities/timestamp';
import dayjs, { type Dayjs, isDayjs } from 'dayjs';
import { useMemo } from 'react';

interface DateTimeDisplayProps {
  value?: Dayjs | string | Timestamp;
}

export const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ value }) => {
  const displayValue = useMemo(() => {
    if (!value) {
      return null;
    }
    if (isDayjs(value)) {
      return value;
    }
    if (typeof value === 'string') {
      return dayjs(value);
    }

    return fromTimestampToDayjs(value);
  }, [value]);

  if (!value) {
    return '-';
  }

  return (
    <div className='w-fit'>
      <Typography variant='inherit'>{displayValue?.format(DATE_FORMAT)}</Typography>
      <Typography variant='caption' color='text.secondary'>
        {displayValue?.format(TIME_FORMAT)}
      </Typography>
    </div>
  );
};
