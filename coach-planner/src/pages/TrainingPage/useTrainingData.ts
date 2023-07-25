import { TrainingResponse } from '@/db/constants';
import { getTrainingRef } from '@/db/trainings';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';

export const useTrainingData = () => {
  const { id } = useParams();
  const [value, loading, error] = useDocument(getTrainingRef(id));
  const training = value ? ({ id: value.id, ...value.data() } as TrainingResponse) : undefined;
  return { training, loading, error };
};
