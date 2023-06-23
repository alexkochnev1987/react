import { red } from '@mui/material/colors';
import { Avatar, Button, Card, CardHeader, CardMedia, Grid } from '@mui/material';
import { ExerciseResponse, deleteExercise, updateExercise } from '../../db/exercises';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { SubmitDialog } from '../dialogs/exercise-dialog/submit-dialog';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../../router/routes';
// import { ShowImage } from '../dialogs/exercise-dialog/Show-image';
import { EditContent } from './Edit-content';
import { MultipleSelectChip } from './Edit-tags';
import { ageOptions, deleteDialogContent, tagOptions } from './constants';
import { Conva } from '../Conva/Conva';

export const ChangeExerciseCard = ({ exercise }: { exercise: ExerciseResponse }) => {
  const navigate = useNavigate();
  const [openSubmit, setOpenSubmit] = useState(false);
  const deleteMyExercise = () => {
    navigate(RouteNames.myExercises);
    deleteExercise(exercise.id);
  };

  const updateMyExercise = (content: undefined | string, fieldName: string) => {
    updateExercise(exercise.id, { [fieldName]: content });
  };

  return (
    <Card>
      <SubmitDialog
        content={deleteDialogContent}
        open={openSubmit}
        submit={deleteMyExercise}
        onClose={() => {
          setOpenSubmit(false);
        }}
      />
      <CardHeader
        title={
          <EditContent
            label={'Название упражнения'}
            callback={(value) => updateMyExercise(value, 'name')}
            value={exercise.name}
          />
        }
        avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={exercise.coachImage} />}
        action={
          <Button onClick={() => setOpenSubmit(true)} color="error">
            <DeleteForeverIcon />
          </Button>
        }
      />
      <Grid container padding={1}>
        <Grid item>
          <Conva />
          <CardMedia component="img" width={'100%'} image={exercise.img} alt={exercise.name} />
          {/* <CardMedia component="img" width={'100%'} image={exercise.img} alt={exercise.name} />
          <Grid item xs={12} sm={6}>
            <ShowImage idExercise={exercise.id} />
          </Grid> */}
        </Grid>
        <Grid item xs={12} sm={4} md={6} lg={6}>
          <EditContent
            callback={(value) => updateMyExercise(value, 'description')}
            value={exercise.description}
            label={'Описание упражнения'}
          />
          <EditContent
            callback={(value) => updateMyExercise(value, 'keyPoints')}
            value={exercise.keyPoints}
            label={'Key points'}
          />
          <MultipleSelectChip
            idExercise={exercise.id}
            fieldName={'tag'}
            value={exercise.tag}
            label={'Tag'}
            options={tagOptions}
          />

          <MultipleSelectChip
            idExercise={exercise.id}
            fieldName={'age'}
            value={exercise.age}
            label={'Age'}
            options={ageOptions}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
