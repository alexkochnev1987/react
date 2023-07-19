import { CardActions, CardMedia, Collapse, IconButton } from '@mui/material';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import { addExerciseInTraining } from '../../db/trainings';
import { ExerciseResponse } from '../../db/constants';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/userSlice';

export const ExpandExerciseImage = ({
  exercise,
  trainingId,
}: {
  trainingId: string | undefined;
  exercise: ExerciseResponse;
}) => {
  const [expanded, setExpanded] = useState(false);
  const userUiid = useAppSelector(selectUser);
  const handleExpandClick = () => setExpanded((x) => !x);
  const addExerciseToTraining = () => {
    trainingId && addExerciseInTraining(userUiid, exercise, trainingId);
  };

  return (
    <>
      <CardActions disableSpacing>
        <IconButton onClick={addExerciseToTraining} aria-expanded={expanded} aria-label="show more">
          {<AddIcon />}
        </IconButton>
        {exercise?.name ? exercise?.name : 'No name'}
        <IconButton onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {exercise.img ? <CardMedia sx={{ height: 140 }} image={exercise.img} /> : 'No Image'}
      </Collapse>
    </>
  );
};