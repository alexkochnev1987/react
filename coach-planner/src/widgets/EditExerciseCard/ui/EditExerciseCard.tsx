import { Button, Card, CardHeader, Grid } from '@mui/material';
import { deleteExercise, updateExercise } from '../../../db/exercises';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from 'react';
import { SubmitDialog } from '../../../components/dialogs/exercise-dialog/submit-dialog';
import { useNavigate } from 'react-router-dom';
import { EditContent } from '@/features/EditContent/ui/Edit-content';
import { deleteDialogContent, editContentFieldArray, editTagsFieldArray } from '../lib/constants';
import { setImage } from '../../../store/slices/draw-objects-slice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { ExerciseResponse } from '../../../db/constants';
import { RoutePath } from '@/app/providers/RouterProvider/lib/constants';
import { EditTags } from '@/features/EditTags/ui/EditTags';
import { AllDrawType } from '@/features/DrawExercise/lib/helpers';
import { DrawExercise } from '@/features/DrawExercise/ui/DrawExercise';
import { selectUser } from '@/store/slices/userSlice';

export const EditExerciseCard = ({ exercise }: { exercise: ExerciseResponse }) => {
  const navigate = useNavigate();
  const userUiid = useAppSelector(selectUser);
  const [openSubmit, setOpenSubmit] = useState(false);
  const deleteMyExercise = () => {
    deleteExercise(userUiid, exercise.id);
    navigate(RoutePath.exercise);
  };

  const updateMyExercise = (content: string | AllDrawType | string[] | undefined, fieldName: string) => {
    updateExercise(userUiid, exercise.id, { [fieldName]: content });
  };

  const dispatch = useAppDispatch();

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
            <EditContent callback={(value) => updateMyExercise(value, field)} value={exercise[field]} label={label} />
          </Grid>
        ))}

        {editTagsFieldArray.map(({ field, defaultTags, label }) => (
          <Grid item xs={12} key={field}>
            <EditTags
              callback={(value) => updateMyExercise(value, field)}
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
