import { Box, IconButton, TextField, Typography } from '@mui/material';
import { IExerciseParams } from '../exercise-params/constants';
import { countExerciseTime } from '../../utils/countExerciseTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export const ExerciseCardHeader = ({
  name,
  params,
  expanded,
  handleExpandClick,
}: {
  name: string;
  params: IExerciseParams;
  expanded: boolean;
  handleExpandClick: () => void;
}) => {
  return (
    <Box display={'flex'} justifyContent={'space-between'}>
      <Typography variant="h5">{name}</Typography>
      <TextField
        size="small"
        sx={{ width: '55px' }}
        id="outlined-basic"
        label="Total"
        variant="outlined"
        value={countExerciseTime(params.explanation, params.repetitions, params.work, params.rest)}
        disabled
      />
      <IconButton onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
    </Box>
  );
};
