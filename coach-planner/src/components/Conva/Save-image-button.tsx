import { Box, IconButton, Tooltip } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { deleteCurrent } from '../../store/slices/draw-objects-slice';
import { ActionsOnConva, TooltipTitle } from '../draw/constants';

export const SaveImageButtons = ({ saveImage }: { saveImage: () => Promise<void> }) => {
  const dispatch = useAppDispatch();
  const onSaveImage = () => {
    saveImage();
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
        <IconButton color="primary">{ActionsOnConva.saveAs}</IconButton>
      </Tooltip>
    </Box>
  );
};
