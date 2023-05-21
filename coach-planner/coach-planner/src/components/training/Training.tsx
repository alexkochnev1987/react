import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import {
  TrainingResponse,
  addExerciseInTraining,
  deleteTraining,
} from "../../db/trainings";
import { OpenExerciseDialog } from "../Open-exercise-dialog";
import { ExerciseResponse } from "../../db/exercises";
import { ExerciseParamsCard } from "./Exercise-params-card";
import { countEnergySupplyTime } from "../../utils/countEnergySupplyTime";
import { TrainingParams } from "./Training-params";
import { ExerciseTree } from "../tree/Exercise-tree";
import { ExpandText } from "./ExpandText";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../router/routes";

export const Training = ({ training }: { training: TrainingResponse }) => {
  const buttonLabel = "Add new exercise";
  const navigate = useNavigate();

  const { id, coachId, coachImage, comments, exercises, name } = training;

  const addExercise = (exercise: ExerciseResponse) => {
    addExerciseInTraining(exercise, id);
  };

  const deleteMyTraining = () => {
    deleteTraining(id);
    navigate(RouteNames.trainings);
  };

  return (
    <>
      <ExpandText label="Show exercises">
        <ExerciseTree coachId={coachId} />
      </ExpandText>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        boxSizing="border-box"
        p={1}
        m={0}
        width={"100%"}
      >
        <Typography variant="h2">{name}</Typography>
        <Button onClick={deleteMyTraining} color="error" variant="contained">
          Delete Training
        </Button>
      </Grid>
      <TrainingParams id={id} params={countEnergySupplyTime(exercises)} />
      <OpenExerciseDialog callback={addExercise} buttonLabel={buttonLabel} />
      {exercises &&
        exercises.map((x) => (
          <ExerciseParamsCard trainingId={id} key={x.uuid} exercise={x} />
        ))}
    </>
  );
};
