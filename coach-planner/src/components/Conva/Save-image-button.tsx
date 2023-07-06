import { Box, Button, Tooltip } from '@mui/material';

import { ActionsOnConva, TooltipTitle } from '../draw/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { createExercise } from '../../db/exercises';
import { RouteNames } from '../../router/routes';

export const SaveImageButtons = ({ saveImage }: { saveImage: (id: string | undefined) => Promise<void> }) => {
  const { id } = useParams();
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
      <Tooltip title={TooltipTitle.save} placement="top">
        <Button color="primary" onClick={onSaveImage} variant="outlined">
          {ActionsOnConva.saveIcon}
        </Button>
      </Tooltip>
      <Tooltip title={TooltipTitle.saveAs} placement="top">
        <Button color="primary" onClick={createNewExercise} variant="outlined">
          {ActionsOnConva.saveAs}
        </Button>
      </Tooltip>
    </Box>
  );
};
