import { ExerciseCard } from '../../components/Exercise-card';
import { Grid } from '@mui/material';
import { HandleDataWrapper } from '@/pages/PageWrappers/HandleDataWrapper';
import { getUserExercisesFromStore, loadExercisesFromServer } from '@/service/store.service';

const ExercisesPage = () => {
  const { loading, error, exercises } = getUserExercisesFromStore();
  loadExercisesFromServer();

  return (
    <HandleDataWrapper loading={loading} error={error}>
      <Grid container spacing={1} p={1}>
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </Grid>
    </HandleDataWrapper>
  );
};

export default ExercisesPage;
