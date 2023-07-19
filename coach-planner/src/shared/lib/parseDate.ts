import dayjs from 'dayjs';

export const parseDate = (date: Date) => {
  const dt = dayjs(date);
  const formatted = dt.format('DD/MM/YYYY');
  return formatted;
};
