import { type DocumentData, QuerySnapshot } from 'firebase/firestore';
import { ExerciseResponse } from '../../db/constants';

export const splitExercisesByTag = (data: QuerySnapshot<DocumentData>, filterByTag: boolean) => {
  return data.docs.reduce((prev, curr) => {
    const exercise = { ...(curr.data() as ExerciseResponse), id: curr.id };
    const tags = filterByTag ? exercise.tag : exercise.age;

    if (tags) {
      if (tags.length > 0) {
        tags.forEach((x) => {
          prev[x] = prev[x] ? [...prev[x], exercise] : [exercise];
        });
        return prev;
      } else {
        prev['noTag'] = prev['noTag'] ? [...prev['noTag'], exercise] : [exercise];
        return prev;
      }
    }
    prev['noTag'] = prev['noTag'] ? [...prev['noTag'], exercise] : [exercise];
    return prev;
  }, {} as { [key: string]: ExerciseResponse[] });
};
