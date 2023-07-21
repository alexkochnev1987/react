import { ExerciseCard } from '../../components/Exercise-card';
import { Grid } from '@mui/material';
import { useGetExercises } from './useGetExercises';
import { HandleDataWrapper } from '../PageWrappers/HandleDataWrapper';

const Exercise = () => {
  const { loading, error, exercises } = useGetExercises();

  return (
    <HandleDataWrapper loading={loading} error={error}>
      <Grid container spacing={1} p={1}>
        {exercises?.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </Grid>
    </HandleDataWrapper>
  );
};

export default Exercise;
