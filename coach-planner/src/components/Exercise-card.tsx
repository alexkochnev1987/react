import { Avatar, Button, Card, CardHeader, CardMedia, Chip, Grid } from '@mui/material';
import { red } from '@mui/material/colors';
import { ExpandText } from '@/shared/ui/ExpandText';
import { NavLink } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import SubmitDialog from './dialogs/exercise-dialog/submit-dialog';
import { useState } from 'react';
import { deleteDialogContent } from '@/widgets/EditExerciseCard/lib/constants';
import { RoutePath } from '@/app/providers/RouterProvider/config/constants';
import { ExerciseForPage } from '@/service/parseExerciseResponse';
import { useDeleteExercise } from '@/service/store.service';

export const ExerciseCard = ({ exercise }: { exercise: ExerciseForPage }) => {
  const [openSubmit, setOpenSubmit] = useState(false);
  const deleteExercise = useDeleteExercise(exercise.id);

  return (
    <Grid item xs={12}>
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
          title={exercise.name}
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={exercise.coachImage} />
          }
          subheader={exercise.tag?.map((x) => (
            <Chip label={x} key={x} />
          ))}
          action={
            <>
              <Button onClick={() => setOpenSubmit(true)} color="error">
                <DeleteForeverIcon />
              </Button>
              <NavLink
                to={RoutePath.exercise + RoutePath.main + exercise.id}
                style={{ textDecoration: 'none' }}
              >
                <Button>
                  <ModeEditOutlineIcon />
                </Button>
              </NavLink>
            </>
          }
        />
        <Grid container padding={1}>
          <Grid item xs={12} sm={8} md={6} lg={6}>
            <CardMedia component="img" width={'100%'} image={exercise.img} alt={exercise.name} />
          </Grid>
          <Grid item xs={12} sm={4} md={6} lg={6}>
            <ExpandText label="Description" text={exercise.description} />
            <ExpandText label="Key points" text={exercise.keyPoints} />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};
