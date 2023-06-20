import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { ExerciseResponse } from "../../db/exercises";
import { CardActions, Collapse, IconButton } from "@mui/material";
import { TreeExerciseCard } from "./Tree-exercise-card";

export const ExpandTag = ({
  exercises,
  tag,
}: {
  exercises: ExerciseResponse[];
  tag: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => setExpanded((x) => !x);
  return (
    <>
      <CardActions disableSpacing>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        {tag}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <TreeExerciseCard exercises={exercises} />
      </Collapse>
    </>
  );
};
