import { format, isValid, parseISO } from 'date-fns';

export const toIsoNow = () => new Date().toISOString();

export const toDateTimeLocal = (iso: string) => {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return format(new Date(), "yyyy-MM-dd'T'HH:mm");
  }

  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60_000);

  return localDate.toISOString().slice(0, 16);
};

export const fromDateTimeLocal = (value: string) => {
  if (!value) {
    return toIsoNow();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? toIsoNow() : parsed.toISOString();
};

export const formatTimestamp = (iso: string) => {
  const parsed = parseISO(iso);
  return isValid(parsed) ? format(parsed, 'MMM d, yyyy • h:mm a') : iso;
};

export const isWithinDateRange = (iso: string, start?: string, end?: string) => {
  const value = parseISO(iso).getTime();

  if (Number.isNaN(value)) {
    return false;
  }

  const startTime = start ? new Date(`${start}T00:00:00`).getTime() : undefined;
  const endTime = end ? new Date(`${end}T23:59:59`).getTime() : undefined;

  if (startTime && value < startTime) {
    return false;
  }

  if (endTime && value > endTime) {
    return false;
  }

  return true;
};

