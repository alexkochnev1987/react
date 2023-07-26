import { ExerciseResponse } from '@/db/constants';

export const makeExerciseTreeBy = (exercises: ExerciseResponse[], by: 'tag' | 'age') => {
  return exercises.reduce((prev, curr) => {
    const nodes = curr[by];
    if (nodes && nodes.length > 0) {
      nodes.forEach((leaf) => {
        prev[leaf] = prev[leaf] ? [...prev[leaf], curr] : [curr];
      });
      return prev;
    } else {
      prev['noTag'] = prev['noTag'] ? [...prev['noTag'], curr] : [curr];
      return prev;
    }
  }, {} as { [key: string]: ExerciseResponse[] });
};
