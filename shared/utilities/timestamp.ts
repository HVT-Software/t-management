import { Timestamp } from '@bufbuild/protobuf/wkt';
import dayjs, { type Dayjs } from 'dayjs';

type PlainTimestamp = Pick<Timestamp, 'nanos' | 'seconds'>;

export function fromIsoStringToTimestamp(iso: string) {
  if (!iso) {
    return null;
  }
  const date = new Date(iso);
  if (isNaN(date.getTime())) {
    return null;
  }

  const seconds = Math.floor(date.getTime() / 1000);
  const nanos = (date.getTime() % 1000) * 1e6;

  return { seconds, nanos };
}

export function toTimestamp(date: Date): PlainTimestamp {
  const seconds = BigInt(Math.floor(date.getTime() / 1000));
  const nanos = (date.getTime() % 1000) * 1e6;
  return { seconds, nanos };
}

export function fromTimestampToDate(timestamp: Timestamp): Date {
  const millis = Number(timestamp.seconds) * 1000 + Math.floor(timestamp.nanos / 1e6);
  return new Date(millis);
}

export function fromTimestampToDayjs(ts: Timestamp): Dayjs {
  const millis = Number(ts.seconds) * 1000 + Math.floor(ts.nanos / 1e6);
  return dayjs(millis);
}

export function fromDayjsToTimestamp(d: Dayjs): PlainTimestamp {
  const millis = d.valueOf();
  return {
    seconds: BigInt(Math.floor(millis / 1000)),
    nanos: (millis % 1000) * 1e6
  };
}
