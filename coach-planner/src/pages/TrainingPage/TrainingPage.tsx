import { EditTraining } from '@/widgets/EditTraining/EditTraining';
import { useTrainingData } from './useTrainingData';
import { HandleDataWrapper } from '../PageWrappers/HandleDataWrapper';

const TrainingPage = () => {
  const { training, loading, error } = useTrainingData();

  return (
    <HandleDataWrapper loading={loading} error={error}>
      {training && <EditTraining training={training} />}
    </HandleDataWrapper>
  );
};

export default TrainingPage;
