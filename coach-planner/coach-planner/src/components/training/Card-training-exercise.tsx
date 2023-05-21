import { Button, Card, CardHeader, CardMedia, Grid } from "@mui/material";

import { ExerciseResponse } from "../../db/exercises";
import { ExpandText } from "./ExpandText";
import { ExerciseParams } from "../exercise-params/exercise-params";
import { IExerciseParams } from "../exercise-params/constants";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const CardTrainingExercise = ({
  exercise,
  deleteExercise,
  submitParams,
  params,
  children,
}: {
  deleteExercise: () => void;
  exercise: ExerciseResponse;
  submitParams: (data: IExerciseParams) => void;
  params: IExerciseParams;
  children?: React.ReactNode;
}) => {
  return (
    <Card>
      <CardHeader
        action={
          <Button onClick={deleteExercise} color="error">
            <DeleteForeverIcon />
          </Button>
        }
        title={exercise.name}
        subheader={exercise.tag?.map((x, index) => (
          <span key={x}>{x}; </span>
        ))}
        avatar={children}
      />
      <ExpandText label="Image">
        <CardMedia
          component="img"
          width={"100%"}
          image={exercise.img}
          alt={exercise.name}
        />
      </ExpandText>
      <ExerciseParams submit={submitParams} params={params} />
      <Grid container justifyContent="space-between">
        <ExpandText
          label="Description"
          text={exercise.description}
        ></ExpandText>
        <ExpandText label="Key points" text={exercise.keyPoints}></ExpandText>
      </Grid>
    </Card>
  );
};
