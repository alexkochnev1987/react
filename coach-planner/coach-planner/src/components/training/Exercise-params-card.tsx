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
import { Button } from "@mui/material";

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
    shiftExercise(trainingId, exercise.uuid, shiftExerciseRight);
  };

  const shiftExerciseDown = () => {
    shiftExercise(trainingId, exercise.uuid, shiftExerciseLeft);
  };

  return (
    <>
      <Button onClick={shiftExerciseUp}>Up</Button>
      <Button onClick={shiftExerciseDown}>Down</Button>
      <CardTrainingExercise
        exercise={exercise.exercise}
        deleteExercise={deleteExercise}
        submitParams={submitParams}
        params={exercise.params}
      />
    </>
  );
};
