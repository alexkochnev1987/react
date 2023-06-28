import { getExerciseDocRef } from '../db/exercises';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import { ChangeExerciseCard } from '../components/Exercise/Change-exercise-card';
import { ExerciseResponse } from '../db/constants';

export const SetExercise = () => {
  const params = useParams();
  const id = params.id as string;
  const [exercise] = useDocument(getExerciseDocRef(id));

  return exercise && <ChangeExerciseCard exercise={{ id: exercise.id, ...exercise.data() } as ExerciseResponse} />;
};
