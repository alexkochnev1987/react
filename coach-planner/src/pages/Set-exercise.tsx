import { getExerciseDocRef } from '../db/exercises';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import { EditExerciseCard } from '@/widgets/EditExerciseCard/ui/EditExerciseCard';
import { ExerciseResponse } from '../db/constants';

const SetExercise = () => {
  const params = useParams();
  const id = params.id as string;
  const [exercise] = useDocument(getExerciseDocRef(id));

  return exercise ? <EditExerciseCard exercise={{ id: exercise.id, ...exercise.data() } as ExerciseResponse} /> : null;
};

export default SetExercise;
