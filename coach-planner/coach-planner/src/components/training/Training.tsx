import { Avatar, Card, CardHeader, Grid } from "@mui/material";
import { TrainingResponse, addExerciseInTraining } from "../../db/trainings";
import { red } from "@mui/material/colors";
import { OpenExerciseDialog } from "../Open-exercise-dialog";
import { ExerciseResponse } from "../../db/exercises";
import { ExerciseParamsCard } from "./Exercise-params-card";
import { countEnergySupplyTime } from "../../utils/countEnergySupplyTime";
import { TrainingParams } from "./Training-params";
import { ExerciseTree } from "../tree/Exercise-tree";
import { ExpandText } from "./ExpandText";

export const Training = ({ training }: { training: TrainingResponse }) => {
  const buttonLabel = "Add new exercise";

  const { id, coachId, coachImage, comments, exercises, name } = training;

  const addExercise = (exercise: ExerciseResponse) => {
    addExerciseInTraining(exercise, id);
  };

  return (
    <Card>
      <ExpandText label="Show exercises">
        <ExerciseTree coachId={coachId} />
      </ExpandText>
      <CardHeader
        title={
          <TrainingParams id={id} params={countEnergySupplyTime(exercises)} />
        }
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={coachImage}
          />
        }
      />
      <Grid container spacing={2} sx={{ background: "red" }}>
        <Grid item xs={6} md={4} sx={{ background: "green" }}>
          Training
        </Grid>
        <Grid item xs={6} md={8} sx={{ background: "green" }}>
          {name}
        </Grid>
      </Grid>
      <OpenExerciseDialog callback={addExercise} buttonLabel={buttonLabel} />
      {exercises &&
        exercises.map((x) => (
          <ExerciseParamsCard trainingId={id} key={x.uuid} exercise={x} />
        ))}
    </Card>
  );
};
