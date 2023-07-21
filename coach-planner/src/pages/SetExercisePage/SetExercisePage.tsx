import { EditExerciseCard } from '@/widgets/EditExerciseCard/ui/EditExerciseCard';
import { useGetExercise } from './useGetExercise';
import { HandleDataWrapper } from '../PageWrappers/HandleDataWrapper';

const SetExercise = () => {
  const { loading, error, exercise } = useGetExercise();

  return (
    <HandleDataWrapper loading={loading} error={error}>
      {exercise && <EditExerciseCard exercise={exercise} />}
    </HandleDataWrapper>
  );
};

export default SetExercise;
