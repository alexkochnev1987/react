import {
  Card,
  CardMedia,
  Chip,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  Typography,
} from '@mui/material';
import { ExpandText } from '../../shared/ui/ExpandText';
import { ExerciseParams } from '../../components/exercise-params/exercise-params';
import { IExerciseParams } from '../../components/exercise-params/constants';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ExerciseResponse } from '../../db/constants';
import { parseDate } from '@/shared/lib/parseDate';
import { DescriptionField } from '@/shared/ui/DescriptionField';
import { useState } from 'react';

export const SetTrainingCard = ({
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
  const [hide, setHide] = useState(true);
  return (
    <Grid item xs={12}>
      <Card>
        <Grid item xs={12} container spacing={2} padding={0} position={'relative'}>
          <Grid item xs container>
            <Grid
              item
              container
              direction="column"
              justifyContent="space-evenly"
              alignItems="center"
              width={'30px'}
            >
              <IconButton onClick={deleteExercise} color="error" size="small">
                <DeleteForeverIcon />
              </IconButton>
              {children}
            </Grid>
            <Grid item xs>
              <Typography variant="h5" color={'primary'}>
                {exercise.name}
              </Typography>
              <DescriptionField label={'Tag'}>
                {exercise.tag?.map((tag) => (
                  <Chip label={tag} key={tag} size="small" />
                ))}
              </DescriptionField>
              <DescriptionField label={'Created'}>
                {parseDate(exercise.create.toDate())}
              </DescriptionField>

              {exercise.modify && (
                <DescriptionField label={'Modify'}>
                  {parseDate(exercise.modify?.toDate())}
                </DescriptionField>
              )}
              <DescriptionField label={'Age'}>
                {exercise.age?.map((age) => (
                  <Chip label={age} key={age} size="small" />
                ))}
              </DescriptionField>
              <Grid item xs={12}>
                <ExpandText label="Key points" text={exercise.keyPoints} />
                <ExpandText label="Description" text={exercise.description} />
              </Grid>
            </Grid>
            <Grid item sm={5} minWidth={230} sx={{ display: { xs: 'none', md: 'grid' } }}>
              <ExerciseParams submit={submitParams} params={params} />
            </Grid>
          </Grid>
          <Grid item xs sm={5} sx={{ display: { xs: 'none', md: 'grid' } }}>
            <CardMedia component="img" image={exercise.img} alt={exercise.name} />
          </Grid>
          <Grid
            item
            xs={8}
            sx={{ display: { xs: 'grid', md: 'none' } }}
            alignItems={'center'}
            textAlign={'center'}
            container
          >
            <Grid item xs={12}>
              <FormControlLabel
                value="top"
                control={<Switch color="primary" onChange={() => setHide((prev) => !prev)} />}
                label={hide ? 'Params' : 'Image'}
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={12}>
              {hide ? (
                <ExerciseParams submit={submitParams} params={params} />
              ) : (
                <CardMedia component="img" image={exercise.img} alt={exercise.name} />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};
