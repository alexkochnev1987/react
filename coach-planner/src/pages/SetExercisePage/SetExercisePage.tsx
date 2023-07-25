import { EditExerciseCard } from '@/widgets/EditExerciseCard/ui/EditExerciseCard';
import { HandleDataWrapper } from '../PageWrappers/HandleDataWrapper';
import { getExerciseFromStore, loadExerciseFromServer } from '@/service/store.service';

const SetExercise = () => {
  const { loading, error, exercise } = getExerciseFromStore();
  loadExerciseFromServer();
  return (
    <HandleDataWrapper loading={loading} error={error}>
      {exercise && <EditExerciseCard exercise={exercise} />}
    </HandleDataWrapper>
  );
};

export default SetExercise;
