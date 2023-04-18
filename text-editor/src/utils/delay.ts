export const delay = (callback: Function, ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(callback()), ms));
