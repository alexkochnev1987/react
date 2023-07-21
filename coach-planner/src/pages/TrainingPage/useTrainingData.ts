import { TrainingResponse } from '@/db/constants';
import { getTrainingRef } from '@/db/trainings';
import { useUserUiid } from '@/shared/hooks/useUserUiid';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';

export const useTrainingData = () => {
  const userUiid = useUserUiid();
  const { id } = useParams();
  const [value, loading, error] = useDocument(getTrainingRef(userUiid, id));
  const training = value ? ({ id: value.id, ...value.data() } as TrainingResponse) : undefined;
  return { training, loading, error };
};
