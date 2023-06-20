import { createExercise, exerciseCollection, ExerciseResponse } from '../db/exercises';

import { useCollection } from 'react-firebase-hooks/firestore';
import { ExerciseCard } from '../components/Exercise-card';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

export const Exercise = () => {
  const navigate = useNavigate();
  const buttonLabel = 'Create new exercise';
  const [user] = useAuthState(auth);
  const [value] = useCollection(exerciseCollection);
  const createNewExercise = async () => {
    const newExercise = await createExercise(user?.uid, user?.photoURL);
    if (newExercise) navigate(newExercise);
  };

  return (
    <Box gap={1} padding={1}>
      <Button variant="outlined" onClick={createNewExercise}>
        {buttonLabel}
      </Button>
      {value &&
        value.docs.map((doc) => (
          <ExerciseCard key={doc.id} exercise={{ id: doc.id, ...doc.data() } as ExerciseResponse} />
        ))}
    </Box>
  );
};
