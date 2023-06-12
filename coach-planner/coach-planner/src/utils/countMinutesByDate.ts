export const countMinutesByDate = (start: string, end: string) => {
  const millisecondsInSecond = 1000;
  const secondsInMinute = 60;
  const date1 = new Date(start);
  const date2 = new Date(end);
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const hoursDiff = Math.floor(
    timeDiff / (millisecondsInSecond * secondsInMinute)
  );
  return hoursDiff;
};
