import { useCollection } from 'react-firebase-hooks/firestore';
import { CircularProgress, Link, MenuItem } from '@mui/material';
import { deleteTraining, getTrainingsCollection } from '@/db/trainings';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/userSlice';
import { FirebaseError } from '@/components/Firebase-error';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { TrainingCard } from '@/widgets/TrainingCard/TrainingCard';
import { TrainingResponse } from '@/db/constants';
import { SubmitDialog } from '@/components/dialogs/exercise-dialog/submit-dialog';
import { useState } from 'react';

const TrainingsPage = () => {
  const userUiid = useAppSelector(selectUser);
  const [trainings, loading, error] = useCollection(getTrainingsCollection(userUiid));
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <FirebaseError error={error} />;
  }

  const parseTrainings = (trainings: QuerySnapshot<DocumentData> | undefined) => {
    if (!trainings) return null;
    const parsed = trainings.docs.map((training) => ({ id: training.id, ...training.data() } as TrainingResponse));
    return parsed.map((training) => <TrainingCard training={training} />);
  };

  return <>{parseTrainings(trainings)}</>;
};

export default TrainingsPage;
