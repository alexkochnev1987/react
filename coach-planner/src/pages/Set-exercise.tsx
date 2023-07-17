import { getExerciseDocRef } from '../db/exercises';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import { EditExerciseCard } from '@/widgets/EditExerciseCard/ui/EditExerciseCard';
import { ExerciseResponse } from '../db/constants';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/userSlice';
import { CircularProgress } from '@mui/material';
import { FirebaseError } from '@/components/Firebase-error';

const SetExercise = () => {
  const params = useParams();
  const userUiid = useAppSelector(selectUser);
  const id = params.id as string;
  const [exercise, loading, error] = useDocument(getExerciseDocRef(userUiid, id));
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <FirebaseError error={error} />;
  }

  return exercise ? <EditExerciseCard exercise={{ id: exercise.id, ...exercise.data() } as ExerciseResponse} /> : null;
};

export default SetExercise;
