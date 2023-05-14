import { ExerciseResponse, deleteExercise } from "../db/exercises";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { ExpandText } from "./training/ExpandText";
import { OpenExerciseDialog } from "./Open-exercise-dialog";

export const ExerciseCard = ({ exercise }: { exercise: ExerciseResponse }) => {
  const buttonLabel = "Update exercise";
  const deleteExercises = () => {
    deleteExercise(exercise.id);
  };

  return (
    <Card>
      <Button onClick={deleteExercises}>Delete</Button>
      <OpenExerciseDialog
        exerciseResponse={exercise}
        buttonLabel={buttonLabel}
      />
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
      <Grid container padding={1}>
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <CardMedia
            component="img"
            width={"100%"}
            image={exercise.img}
            alt={exercise.name}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={6} lg={6}>
          <ExpandText label="Description" text={exercise.description} />
          <ExpandText label="Key points" text={exercise.keyPoints} />
        </Grid>
      </Grid>
    </Card>
  );
};
