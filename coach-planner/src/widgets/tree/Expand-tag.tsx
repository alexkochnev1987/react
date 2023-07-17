import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { CardActions, Collapse, IconButton } from '@mui/material';
import { ExerciseResponse } from '../../db/constants';
import { useParams } from 'react-router-dom';
import { ExpandExerciseImage } from './Expand-exercise-image';

export const ExpandTag = ({ exercises, tag }: { exercises: ExerciseResponse[]; tag?: string }) => {
  const [expanded, setExpanded] = useState(false);
  const { id } = useParams();
  const handleExpandClick = () => setExpanded((x) => !x);
  return (
    <>
      <CardActions disableSpacing>
        <IconButton onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
        {tag}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {exercises.map((exercise) => (
          <ExpandExerciseImage exercise={exercise} trainingId={id} key={exercise.id} />
        ))}
      </Collapse>
    </>
  );
};
