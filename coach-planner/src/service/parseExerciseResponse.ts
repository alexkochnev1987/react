import { ExerciseResponse } from '@/db/constants';
import { DocumentData, DocumentSnapshot } from '@/lib/firebase/firebase.lib';
import { parseDate } from '@/shared/lib/parseDate';
export interface ExerciseForPage extends Omit<ExerciseResponse, 'modify' | 'create'> {
  modify: string;
  create: string;
}

export const parseExerciseResponse = (doc: DocumentSnapshot<DocumentData>) => {
  const exercise = { id: doc.id, ...doc.data() } as ExerciseResponse;
  const exerciseForPage: ExerciseForPage = {
    ...exercise,
    modify: exercise.modify ? parseDate(exercise.modify.toDate()) : '',
    create: exercise.modify ? parseDate(exercise.modify.toDate()) : '',
  };
  return exerciseForPage;
};
