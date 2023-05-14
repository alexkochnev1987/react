import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { ExerciseResponse } from "../../db/exercises";
import { ExpandText } from "./ExpandText";
import { ExerciseParams } from "../exercise-params/exercise-params";
import { IExerciseParams } from "../exercise-params/constants";

export const CardTrainingExercise = ({
  exercise,
  deleteExercise,
  submitParams,
  params,
}: {
  deleteExercise: () => void;
  exercise: ExerciseResponse;
  submitParams: (data: IExerciseParams) => void;
  params: IExerciseParams;
}) => {
  return (
    <Card>
      <Button onClick={deleteExercise}>Delete current exercise</Button>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <CardHeader
            title={exercise.name}
            avatar={
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
                src={exercise.coachImage}
              />
            }
            subheader={exercise.tag?.map((x) => (
              <Chip label={x} key={x} />
            ))}
          />
          <CardMedia
            component="img"
            width={"100%"}
            image={exercise.img}
            alt={exercise.name}
          />
          <ExpandText label="Description">
            <Typography paragraph>{exercise.description}</Typography>
          </ExpandText>
          <ExpandText label="Key points">
            <Typography paragraph>{exercise.keyPoints}</Typography>
          </ExpandText>
        </Grid>
        <Grid item xs={4}>
          <ExerciseParams submit={submitParams} params={params} />
        </Grid>
      </Grid>
    </Card>
  );
};
