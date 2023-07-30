import { IExerciseParams } from '../../components/exercise-params/constants';

import {
  deleteExerciseInTraining,
  shiftExercise,
  shiftExerciseLeft,
  shiftExerciseRight,
  updateExerciseInTraining,
} from '../../db/trainings';
import { Box, Grid, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { TrainingExerciseData } from '../../db/constants';
import { SetTrainingCard } from './SetTrainingCard';

export const ExerciseParamsCard = ({
  trainingId,
  exercise,
  hide,
}: {
  trainingId: string;
  exercise: TrainingExerciseData;
  hide: boolean;
}) => {
  const submitParams = (data: IExerciseParams) => {
    const newExercise = { ...exercise, params: data };
    updateExerciseInTraining(newExercise, trainingId);
  };

  const deleteExercise = () => {
    deleteExerciseInTraining(exercise.uuid, trainingId);
  };

  const shiftExerciseUp = () => {
    shiftExercise(trainingId, exercise.uuid, shiftExerciseLeft);
  };

  const shiftExerciseDown = () => {
    shiftExercise(trainingId, exercise.uuid, shiftExerciseRight);
  };

  return (
    <SetTrainingCard
      exercise={exercise.exercise}
      deleteExercise={deleteExercise}
      submitParams={submitParams}
      params={exercise.params}
      hide={hide}
    >
      <Box textAlign={'center'}>
        <IconButton onClick={shiftExerciseUp} color="primary" size="small">
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton onClick={shiftExerciseDown} color="primary" size="small">
          <ArrowDownwardIcon />
        </IconButton>
      </Box>
    </SetTrainingCard>
  );
};
