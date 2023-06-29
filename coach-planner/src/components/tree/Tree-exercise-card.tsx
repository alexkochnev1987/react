import { ExerciseResponse } from '../../db/constants';
import { ExpandExerciseImage } from './Expand-exercise-image';
import { useParams } from 'react-router-dom';

export const TreeExerciseCard = ({ exercises }: { exercises: ExerciseResponse[] }) => {
  const { id } = useParams();

  return (
    <>{exercises.length > 0 && exercises.map((x) => <ExpandExerciseImage exercise={x} trainingId={id} key={x.id} />)}</>
  );
};
