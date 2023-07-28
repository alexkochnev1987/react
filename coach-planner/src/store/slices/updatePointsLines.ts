import { ArrowLine } from './constants';

export const updatePointsLines = (lines: Record<string, ArrowLine>, difference: number) => {
  const newLines = Object.values(lines).map((line) => {
    const newLine: ArrowLine = { ...line, points: line.points.map((point) => point * difference) };
    return newLine;
  });
  return newLines.reduce((prev, curr) => {
    prev[curr.id] = curr;
    return prev;
  }, {} as Record<string, ArrowLine>);
};
