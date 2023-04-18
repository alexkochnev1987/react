export const arrToArrString = (arr: (string | number | null | undefined)[]) =>
  arr.filter((elem: any) => Number.isInteger(elem)).map(String);
