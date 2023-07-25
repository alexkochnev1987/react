import { Button, Card, CardHeader, Grid } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from 'react';
import { SubmitDialog } from '../../../components/dialogs/exercise-dialog/submit-dialog';
import { useNavigate } from 'react-router-dom';
import { EditContent } from '@/features/EditContent/ui/Edit-content';
import { deleteDialogContent, editContentFieldArray, editTagsFieldArray } from '../lib/constants';
import { RoutePath } from '@/app/providers/RouterProvider/config/constants';
import { EditTags } from '@/features/EditTags/ui/EditTags';
import { AllDrawType } from '@/features/DrawExercise/lib/helpers';
import { DrawExercise } from '@/features/DrawExercise/ui/DrawExercise';
import { ExerciseForPage } from '@/service/parseExerciseResponse';
import { Timestamp } from '@/lib/firebase/firebase.lib';
import { ExerciseResponse } from '@/db/constants';
import { useExerciseStore } from '@/service/store.service';

export const EditExerciseCard = ({ exercise }: { exercise: ExerciseForPage }) => {
  const [openSubmit, setOpenSubmit] = useState(false);
  const navigate = useNavigate();
  const { dispatch, deleteUserExercise, updateExerciseFunction, setImage } = useExerciseStore();

  const deleteExercise = () => {
    dispatch(deleteUserExercise(exercise.id));
    navigate(RoutePath.exercise);
  };

  const updateExercise = (
    content: string | AllDrawType | string[] | undefined | Timestamp,
    fieldName: keyof ExerciseResponse,
  ) => {
    dispatch(
      updateExerciseFunction({
        id: exercise.id,
        exercise: { [fieldName]: content },
      }),
    );
  };

  useEffect(() => {
    if (exercise.conva) {
      dispatch(setImage(exercise.conva));
    }
  }, [exercise, dispatch]);

  return (
    <Card>
      <SubmitDialog
        content={deleteDialogContent}
        open={openSubmit}
        submit={deleteExercise}
        onClose={() => {
          setOpenSubmit(false);
        }}
      />
      <CardHeader
        title={
          <EditContent
            label={'Название упражнения'}
            callback={(value) => updateExercise(value, 'name')}
            value={exercise.name}
          />
        }
        action={
          <Button onClick={() => setOpenSubmit(true)} color="error">
            <DeleteForeverIcon />
          </Button>
        }
      />
      <Grid container padding={1} spacing={2}>
        <Grid item>
          <DrawExercise />
        </Grid>
        {editContentFieldArray.map(({ field, label }) => (
          <Grid item xs={12} key={field}>
            <EditContent
              callback={(value) => updateExercise(value, field)}
              value={exercise[field]}
              label={label}
            />
          </Grid>
        ))}

        {editTagsFieldArray.map(({ field, defaultTags, label }) => (
          <Grid item xs={12} key={field}>
            <EditTags
              callback={(value) => updateExercise(value, field)}
              defaultTags={defaultTags}
              tags={exercise[field]}
              placeholder={label}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};
