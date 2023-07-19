import { Box, Button, Tooltip } from '@mui/material';

import { ActionsOnConva, TooltipTitle } from '../../features/DrawToolbar/ui/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { createExercise } from '../../db/exercises';
import { RoutePath } from '@/app/providers/RouterProvider/lib/constants';
import { ToolIconButton } from '@/shared/ui/ToolIconButton/ui/ToolIconButton';

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
      const route = `${RoutePath.exercise}/${newExercise.id}`;
      navigate(route);
      saveImage(newExercise.id);
    }
  };

  return (
    <Box display={'flex'} sx={{ height: '45px' }} gap={'5px'}>
      <ToolIconButton onClick={onSaveImage} isActive={false} toolTipTitle={TooltipTitle.save}>
        {ActionsOnConva.saveIcon}
      </ToolIconButton>
      <ToolIconButton onClick={createNewExercise} isActive={false} toolTipTitle={TooltipTitle.saveAs}>
        {ActionsOnConva.saveAs}
      </ToolIconButton>
    </Box>
  );
};
