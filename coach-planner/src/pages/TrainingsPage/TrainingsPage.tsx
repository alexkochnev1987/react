import { Box, Button, Grid } from '@mui/material';
import { TrainingCard } from '@/widgets/TrainingCard/TrainingCard';
import { useTrainingsData } from './useTrainingsData';
import { HandleDataWrapper } from '../PageWrappers/HandleDataWrapper';
import { useCreateActions } from '@/widgets/Navbar/ui/useCreateActions';

const TrainingsPage = () => {
  const { trainings, loading, error } = useTrainingsData();
  const { createNewTraining } = useCreateActions();
  const buttonText = 'Create training';

  return (
    <HandleDataWrapper loading={loading} error={error}>
      <Grid container spacing={1} p={1}>
        <Grid item textAlign={'end'} xs={12}>
          <Button variant="outlined" onClick={createNewTraining}>
            {buttonText}
          </Button>
        </Grid>
        {trainings?.map((training) => (
          <TrainingCard training={training} key={training.id} />
        ))}
      </Grid>
    </HandleDataWrapper>
  );
};

export default TrainingsPage;
