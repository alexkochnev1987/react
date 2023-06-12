import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
} from "@mui/material";

import { ExerciseResponse } from "../../db/exercises";
import { ExpandText } from "./ExpandText";
import { ExerciseParams } from "../exercise-params/exercise-params";
import { IExerciseParams } from "../exercise-params/constants";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ExerciseCardHeader } from "./Exercise-card-header";
import { useState } from "react";

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
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded((x) => !x);
  return (
    <>
      <CardHeader
        action={
          <Button onClick={deleteExercise} color="error">
            <DeleteForeverIcon />
          </Button>
        }
        title={
          <ExerciseCardHeader
            name={exercise.name}
            params={params}
            expanded={expanded}
            handleExpandClick={handleExpandClick}
          />
        }
        // subheader={exercise.tag?.map((x, index) => (
        //   <span key={x}>{x}; </span>
        // ))}
        avatar={children}
      />
      <CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {/* <ExpandText label="Image"> */}
          <CardMedia
            component="img"
            width={"100%"}
            image={exercise.img}
            alt={exercise.name}
          />
          {/* </ExpandText> */}
          <ExerciseParams submit={submitParams} params={params} />
          <Grid container justifyContent="space-between">
            <ExpandText label="Description" text={exercise.description} />
            <ExpandText label="Key points" text={exercise.keyPoints} />
          </Grid>
        </Collapse>
      </CardContent>
    </>
  );
};
