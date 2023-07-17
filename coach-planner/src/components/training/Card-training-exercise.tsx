import {
  Box,
  Button,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { ExpandText } from './ExpandText';
import { ExerciseParams } from '../exercise-params/exercise-params';
import { IExerciseParams } from '../exercise-params/constants';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ExerciseResponse } from '../../db/constants';
import dayjs from 'dayjs';

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
  const parseDate = (date: Date) => {
    const dt = dayjs(date);
    const formatted = dt.format('DD/MM/YYYY');
    return formatted;
  };
  return (
    <>
      <Grid container spacing={2} padding={0}>
        <Grid item xs={7} container>
          <Grid item xs={1} container direction="column" justifyContent="space-evenly" alignItems="center">
            <IconButton onClick={deleteExercise} color="error" size="small">
              <DeleteForeverIcon />
            </IconButton>
            {children}
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5" color={'primary'}>
              {exercise.name}
            </Typography>
            <Typography variant="body1">
              Tag:
              {exercise.tag?.map((tag) => (
                <Chip label={tag} key={tag} size="small" />
              ))}
            </Typography>
            <Typography variant="body1">Created:{parseDate(exercise.create.toDate())}</Typography>
            {exercise.modify && <Typography variant="body1">Modify:{parseDate(exercise.modify?.toDate())}</Typography>}
            <Typography variant="body1">
              Age:{' '}
              {exercise.age?.map((age) => (
                <Chip label={age} key={age} size="small" />
              ))}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <ExerciseParams submit={submitParams} params={params} />
          </Grid>
          <Grid item xs={12}>
            <ExpandText label="Key points" text={exercise.keyPoints} />
            <ExpandText label="Description" text={exercise.description} />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <CardMedia component="img" image={exercise.img} alt={exercise.name} />
        </Grid>
      </Grid>
    </>
  );
};
