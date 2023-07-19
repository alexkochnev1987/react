import { getExerciseCollection } from '../db/exercises';
import { useCollection } from 'react-firebase-hooks/firestore';
import { ExerciseCard } from '../components/Exercise-card';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { ExerciseResponse } from '../db/constants';
import { useAppSelector } from '../store/hooks';
import { useState } from 'react';
import { type DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

import { selectUser } from '@/store/slices/userSlice';

const Exercise = () => {
  const userUiid = useAppSelector(selectUser);
  const [showAll, setShowAll] = useState(true);
  const [user] = useAuthState(auth);
  const collection = getExerciseCollection(userUiid);
  const [value, loading, error] = useCollection(collection);

  const reduceFunction = (previousValue: JSX.Element[], currentValue: QueryDocumentSnapshot<DocumentData>) => {
    const exercise = { id: currentValue.id, ...currentValue.data() } as ExerciseResponse;
    const element = <ExerciseCard key={exercise.id} exercise={exercise} />;
    return showAll || exercise.coachId === user?.uid ? [...previousValue, element] : previousValue;
  };

  return (
    <>
      {/* <Container>
        <Button variant="outlined" onClick={createNewExercise}>
          {buttonLabel}
        </Button>
        <Button variant="outlined" onClick={() => setShowAll((state) => !state)}>
          {showAll ? 'Show only my Exercises' : 'Show All Exercises'}
        </Button>
        <SearchBar />
      </Container> */}
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

export default Exercise;
