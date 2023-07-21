import { Grid } from '@mui/material';
import { TrainingCard } from '@/widgets/TrainingCard/TrainingCard';
import { useTrainingsData } from './useTrainingsData';
import { HandleDataWrapper } from '../PageWrappers/HandleDataWrapper';

const TrainingsPage = () => {
  const { trainings, loading, error } = useTrainingsData();

  return (
    <HandleDataWrapper loading={loading} error={error}>
      <Grid container spacing={1} p={1}>
        {trainings?.map((training) => (
          <TrainingCard training={training} key={training.id} />
        ))}
      </Grid>
    </HandleDataWrapper>
  );
};

export default TrainingsPage;
