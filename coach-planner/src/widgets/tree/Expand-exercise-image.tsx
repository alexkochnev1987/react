import { Button, CardActions, CardMedia, Collapse, Fab, IconButton } from '@mui/material';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import { addExerciseInTraining } from '../../db/trainings';
import { ExerciseResponse } from '../../db/constants';

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
        <Button
          onClick={addExerciseToTraining}
          aria-label="add exercise"
          size="small"
          sx={{ padding: 0, minWidth: '20px', borderRadius: '13px' }}
          variant="contained"
        >
          <AddIcon />
        </Button>
        <span style={{ paddingLeft: '10px' }}>{exercise?.name ? exercise?.name : 'No name'}</span>

        <IconButton onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ margin: 0 }}>
        {exercise.img ? (
          <img src={exercise.img} alt="exercise image" style={{ width: '100%' }} />
        ) : (
          'No Image'
        )}
      </Collapse>
    </>
  );
};
