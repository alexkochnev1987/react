import { useDocument } from 'react-firebase-hooks/firestore';
import { EditTraining } from '../widgets/EditTraining/EditTraining';
import { useParams } from 'react-router-dom';
import { getTrainingRef } from '../db/trainings';
import { CircularProgress, Stack, SwipeableDrawer, Typography } from '@mui/material';
import { TrainingResponse } from '../db/constants';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/userSlice';
import { FirebaseError } from '@/components/Firebase-error';

const TrainingPage = () => {
  const { id } = useParams();
  const userUiid = useAppSelector(selectUser);
  const [value, loading, error] = useDocument(getTrainingRef(userUiid, id));

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <FirebaseError error={error} />;
  }

  return <>{value && <EditTraining training={{ id: value.id, ...value.data() } as TrainingResponse} />}</>;
};

export default TrainingPage;
