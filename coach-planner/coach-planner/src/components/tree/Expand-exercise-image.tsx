import {
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ExerciseResponse } from "../../db/exercises";
import AddIcon from "@mui/icons-material/Add";
import { addExerciseInTraining } from "../../db/trainings";

export const ExpandExerciseImage = ({
  exercise,
  trainingId,
}: {
  trainingId: string | undefined;
  exercise: ExerciseResponse;
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded((x) => !x);
  const addExerciseToTraining = () => {
    trainingId && addExerciseInTraining(exercise, trainingId);
  };

  return (
    <>
      <CardActions disableSpacing>
        <IconButton
          onClick={addExerciseToTraining}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {<AddIcon />}
        </IconButton>
        {exercise?.name ? exercise?.name : "No name"}
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {exercise.img ? (
          <CardMedia sx={{ height: 140 }} image={exercise.img} />
        ) : (
          "No Image"
        )}
      </Collapse>
    </>
  );
};
