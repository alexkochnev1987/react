import { type DocumentData, QuerySnapshot } from 'firebase/firestore';
import { ExerciseResponse } from '../../db/constants';
import { FilterBy } from './SortRadioButtons';
import { ExpandExerciseImage } from './Expand-exercise-image';
import { makeExerciseTreeBy } from './makeExerciseTreeBy';
import { ExpandTag } from './Expand-tag';

export const splitExercisesByTag = (
  data: QuerySnapshot<DocumentData>,
  trainingId: string | undefined,
  filterBy: string,
  ascending: boolean,
) => {
  if (!trainingId) throw Error;
  const sortExercises = (prev: ExerciseResponse, curr: ExerciseResponse) => {
    const first = prev.name ? prev.name.toLowerCase() : '';
    const second = curr.name ? curr.name.toLowerCase() : '';
    if (ascending) return first > second ? 1 : -1;
    return first > second ? -1 : 1;
  };

  const sortTags = (a: [string, any], b: [string, any]) => {
    const first = a[0] ? a[0].toLowerCase() : '';
    const second = b[0] ? b[0].toLowerCase() : '';

    if (Number.isNaN(Number(first)) || Number.isNaN(Number(second))) {
      if (ascending) return first > second ? 1 : -1;
      return first > second ? -1 : 1;
    } else {
      if (ascending) return Number(first) > Number(second) ? 1 : -1;
      return Number(first) > Number(second) ? -1 : 1;
    }
  };
  const exercises = data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as ExerciseResponse));
  exercises.sort(sortExercises);

  switch (filterBy) {
    case FilterBy.NAME:
      return exercises.map((exercise) => (
        <ExpandExerciseImage exercise={exercise} trainingId={trainingId} key={exercise.id} />
      ));
    case FilterBy.AGE:
      return Object.entries(makeExerciseTreeBy(exercises, 'age'))
        .sort(sortTags)
        .map(([key, value]) => <ExpandTag tag={key} exercises={value} key={key} />);
    case FilterBy.TAG:
      return Object.entries(makeExerciseTreeBy(exercises, 'tag'))
        .sort(sortTags)
        .map(([key, value]) => <ExpandTag tag={key} exercises={value} key={key} />);
    default:
      return;
  }
};
