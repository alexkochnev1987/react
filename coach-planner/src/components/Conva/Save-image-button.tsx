import { Box, IconButton, Tooltip } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { deleteCurrent } from '../../store/slices/draw-objects-slice';
import { ActionsOnConva, TooltipTitle } from '../draw/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { createExercise } from '../../db/exercises';
import { RouteNames } from '../../router/routes';

export const SaveImageButtons = ({ saveImage }: { saveImage: (id: string | undefined) => Promise<void> }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const onSaveImage = () => {
    saveImage(id);
  };

  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const createNewExercise = async () => {
    const newExercise = await createExercise(user?.uid);
    if (newExercise) {
      const route = `${RouteNames.myExercises}/${newExercise.id}`;
      navigate(route);
      saveImage(newExercise.id);
    }
  };

  return (
    <Box display={'flex'} sx={{ height: '45px' }} gap={'5px'}>
      <Tooltip title={TooltipTitle.deleteLine} placement="top">
        <IconButton color="error" onClick={() => dispatch(deleteCurrent())}>
          {ActionsOnConva.deleteIcon}
        </IconButton>
      </Tooltip>
      <Tooltip title={TooltipTitle.save} placement="top">
        <IconButton color="primary" onClick={onSaveImage}>
          {ActionsOnConva.saveIcon}
        </IconButton>
      </Tooltip>
      <Tooltip title={TooltipTitle.saveAs} placement="top">
        <IconButton color="primary" onClick={createNewExercise}>
          {ActionsOnConva.saveAs}
        </IconButton>
      </Tooltip>
    </Box>
  );
};
