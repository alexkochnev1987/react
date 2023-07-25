import { TrainingResponse } from '@/db/constants';
import { getTrainingsCollection } from '@/db/trainings';
import { useCollection } from 'react-firebase-hooks/firestore';

export const useTrainingsData = () => {
  const [value, loading, error] = useCollection(getTrainingsCollection());
  const trainings = value?.docs.map(
    (training) => ({ id: training.id, ...training.data() } as TrainingResponse),
  );

  return { trainings, loading, error };
};
