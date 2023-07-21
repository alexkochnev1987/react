import { ExerciseResponse } from '@/db/constants';
import { getExerciseCollection } from '@/db/exercises';
import { useUserUiid } from '@/shared/hooks/useUserUiid';
import { selectUser } from '@/store/slices/userSlice';
import { useCollection } from 'react-firebase-hooks/firestore';

export const useGetExercises = () => {
  const userUiid = useUserUiid();
  const collection = getExerciseCollection(userUiid);
  const [value, loading, error] = useCollection(collection);

  const exercises = value?.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ExerciseResponse));

  return { loading, error, exercises };
};
