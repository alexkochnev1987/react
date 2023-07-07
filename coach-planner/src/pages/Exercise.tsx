import { createExercise, exerciseCollection } from '../db/exercises';

import { useCollection } from 'react-firebase-hooks/firestore';
import { ExerciseCard } from '../components/Exercise-card';
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { ExerciseResponse } from '../db/constants';
import { useAppDispatch } from '../store/hooks';
import { setImageNull } from '../store/slices/draw-objects-slice';
import { useState } from 'react';
import { type DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { RouteNames } from '../router/routes';
import { SearchBar } from '../components/Search-bar/Search-bar';

export const Exercise = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showAll, setShowAll] = useState(true);
  const buttonLabel = 'Create new exercise';
  const [user] = useAuthState(auth);
  const [value, loading, error] = useCollection(exerciseCollection);
  const createNewExercise = async () => {
    const newExercise = await createExercise(user?.uid, user?.photoURL);
    dispatch(setImageNull());
    if (newExercise) navigate(`${RouteNames.myExercises}/${newExercise?.id}`);
  };

  const reduceFunction = (previousValue: JSX.Element[], currentValue: QueryDocumentSnapshot<DocumentData>) => {
    const exercise = { id: currentValue.id, ...currentValue.data() } as ExerciseResponse;
    const element = <ExerciseCard key={exercise.id} exercise={exercise} />;
    return showAll || exercise.coachId === user?.uid ? [...previousValue, element] : previousValue;
  };

  return (
    <>
      <Container>
        <Button variant="outlined" onClick={createNewExercise}>
          {buttonLabel}
        </Button>
        <Button variant="outlined" onClick={() => setShowAll((state) => !state)}>
          {showAll ? 'Show only my Exercises' : 'Show All Exercises'}
        </Button>
        <SearchBar />
      </Container>
      <Box gap={1} padding={1} flex={1} alignSelf={'stretch'}>
        {error && (
          <Typography component="h4" variant="h4" color={'tomato'}>
            {error.message}
          </Typography>
        )}
        {loading && (
          <Typography component="h4" variant="h4" color={'tomato'} textAlign={'center'}>
            <CircularProgress color="inherit" />
          </Typography>
        )}
        {value && value.docs.reduce(reduceFunction, [] as JSX.Element[])}
      </Box>
    </>
  );
};
