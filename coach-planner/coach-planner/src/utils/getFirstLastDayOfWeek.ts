export const getFirstLastDayWeek = () => {
  const today = new Date();
  const currentDayOfWeek = today.getDay();
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - currentDayOfWeek);

  const lastDayOfWeek = new Date(today);
  lastDayOfWeek.setDate(today.getDate() + (6 - currentDayOfWeek));
  return {
    rangeFrom: firstDayOfWeek.toISOString(),
    rangeTo: lastDayOfWeek.toISOString(),
  };
};
