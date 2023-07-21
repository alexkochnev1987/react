import { ExerciseResponse } from '@/db/constants';
import { getExerciseDocRef } from '@/db/exercises';
import { useUserUiid } from '@/shared/hooks/useUserUiid';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';

export const useGetExercise = () => {
  const userUiid = useUserUiid();
  const params = useParams();
  const id = params.id as string;
  const [value, loading, error] = useDocument(getExerciseDocRef(userUiid, id));
  const exercise = value ? ({ id: value.id, ...value.data() } as ExerciseResponse) : undefined;
  return { exercise, loading, error };
};
