import { LineTypes } from '@/store/slices/constants';

export const selectLineDashArray = (line: LineTypes) => {
  if (line === LineTypes.pass) {
    return [0.5, 15];
  }
  if (line === LineTypes.forwardPuck) {
    return [0.5, 10, 15, 10];
  }

  if (line === LineTypes.backwardPuck) {
    return [4, 10, 4, 10, 25, 10];
  }
  return [];
};
