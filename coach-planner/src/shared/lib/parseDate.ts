import dayjs from 'dayjs';

export const parseDate = (date: Date | undefined) => {
  if (!date) return '';
  const dt = dayjs(date);
  const formatted = dt.format('DD/MM/YYYY');
  return formatted;
};

export const parseDateForInput = (date: Date) => {
  const dt = dayjs(new Date(date));
  const formatted = dt.format('YYYY-MM-DD');
  return formatted;
};
