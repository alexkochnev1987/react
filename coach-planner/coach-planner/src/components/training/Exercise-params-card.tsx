import { IExerciseParams } from "../exercise-params/constants";

import {
  TrainingExerciseData,
  deleteExerciseInTraining,
  shiftExercise,
  shiftExerciseLeft,
  shiftExerciseRight,
  updateExerciseInTraining,
} from "../../db/trainings";
import { CardTrainingExercise } from "./Card-training-exercise";
import { Button, IconButton, Stack } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const ExerciseParamsCard = ({
  trainingId,
  exercise,
}: {
  trainingId: string;
  exercise: TrainingExerciseData;
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
    <CardTrainingExercise
      exercise={exercise.exercise}
      deleteExercise={deleteExercise}
      submitParams={submitParams}
      params={exercise.params}
    >
      <Stack spacing={1}>
        <IconButton
          onClick={shiftExerciseUp}
          color="primary"
          size="small"
          sx={{ minWidth: "30px", width: "30px" }}
        >
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton
          onClick={shiftExerciseDown}
          color="primary"
          size="small"
          sx={{ minWidth: "30px", width: "30px" }}
        >
          <ArrowDownwardIcon />
        </IconButton>
      </Stack>
    </CardTrainingExercise>
  );
};
