import { TrainingResponse } from '@/db/constants';
import { getTrainingsCollection } from '@/db/trainings';
import { useUserUiid } from '@/shared/hooks/useUserUiid';
import { useCollection } from 'react-firebase-hooks/firestore';

export const useTrainingsData = () => {
  const userUiid = useUserUiid();
  const [value, loading, error] = useCollection(getTrainingsCollection(userUiid));
  const trainings = value?.docs.map((training) => ({ id: training.id, ...training.data() } as TrainingResponse));

  return { trainings, loading, error };
};
