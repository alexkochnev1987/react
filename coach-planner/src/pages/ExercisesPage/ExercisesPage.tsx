import { ExerciseCard } from '../../components/Exercise-card';
import { Button, Grid } from '@mui/material';
import { HandleDataWrapper } from '@/pages/PageWrappers/HandleDataWrapper';
import { getUserExercisesFromStore, loadExercisesFromServer } from '@/service/store.service';
import { useCreateActions } from '@/widgets/Navbar/ui/useCreateActions';
import { SearchBar } from '@/features/SearchBar/ui/SearchBar';

const ExercisesPage = () => {
  const { loading, error, exercises } = getUserExercisesFromStore();
  const { createNewExercise } = useCreateActions();
  const buttonText = 'Create exercise';
  loadExercisesFromServer();

  return (
    <HandleDataWrapper loading={loading} error={error}>
      <Grid container spacing={1} p={1}>
        <Grid item textAlign={'end'} xs={12}>
          <Button variant="outlined" onClick={createNewExercise}>
            {buttonText}
          </Button>
        </Grid>
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </Grid>
    </HandleDataWrapper>
  );
};

export default ExercisesPage;
