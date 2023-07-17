import { IExerciseParams } from '../exercise-params/constants';

import {
  deleteExerciseInTraining,
  shiftExercise,
  shiftExerciseLeft,
  shiftExerciseRight,
  updateExerciseInTraining,
} from '../../db/trainings';
import { CardTrainingExercise } from './Card-training-exercise';
import { Box, IconButton, Stack } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { TrainingExerciseData } from '../../db/constants';

export const ExerciseParamsCard = ({
  trainingId,
  exercise,
  coachId,
}: {
  coachId: string;
  trainingId: string;
  exercise: TrainingExerciseData;
}) => {
  const submitParams = (data: IExerciseParams) => {
    const newExercise = { ...exercise, params: data };
    updateExerciseInTraining(coachId, newExercise, trainingId);
  };

  const deleteExercise = () => {
    deleteExerciseInTraining(coachId, exercise.uuid, trainingId);
  };

  const shiftExerciseUp = () => {
    shiftExercise(coachId, trainingId, exercise.uuid, shiftExerciseLeft);
  };

  const shiftExerciseDown = () => {
    shiftExercise(coachId, trainingId, exercise.uuid, shiftExerciseRight);
  };

  return (
    <CardTrainingExercise
      exercise={exercise.exercise}
      deleteExercise={deleteExercise}
      submitParams={submitParams}
      params={exercise.params}
    >
      <Box textAlign={'center'}>
        <IconButton onClick={shiftExerciseUp} color="primary" size="small">
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton onClick={shiftExerciseDown} color="primary" size="small">
          <ArrowDownwardIcon />
        </IconButton>
      </Box>
    </CardTrainingExercise>
  );
};
