import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Box, IconButton, Tooltip } from '@mui/material';
import {
  UserActionsValues,
  selectPlayerType,
  selectUserAction,
  setPlayerType,
  setUserAction,
} from '../../store/slices/canvas-slice';
import { SelectColor } from './Tools/Select-color';
import { SelectLineType } from './Tools/Line';
import { SelectSize } from './Tools/Select-size';
import { ActionsOnConva, TooltipTitle, lineTypesArray, playerTypesArray } from './constants';
import { deleteCurrent } from '../../store/slices/draw-objects-slice';

export const UserActions = () => {
  const dispatch = useAppDispatch();
  const userAction = useAppSelector(selectUserAction);
  const playerType = useAppSelector(selectPlayerType);

  return (
    <Box display={'flex'} alignItems={'center'} gap={'5px'} sx={{ height: '60px' }} justifyContent={'space-between'}>
      <Box display={'flex'} sx={{ height: '45px' }} gap={'5px'}>
        {lineTypesArray.map((x) => (
          <IconButton
            color="primary"
            key={x.value}
            onClick={() => dispatch(setUserAction(x.value))}
            sx={{
              border: userAction === x.value ? '2px solid' : 'none',
            }}
          >
            {x.icon}
          </IconButton>
        ))}
        <SelectColor />
        {userAction === UserActionsValues.addPlayer ? (
          playerTypesArray.map((x) => (
            <IconButton
              color="primary"
              key={x.value}
              onClick={() => dispatch(setPlayerType(x.value))}
              sx={{
                border: playerType === x.value ? '2px solid' : 'none',
              }}
            >
              {x.icon}
            </IconButton>
          ))
        ) : (
          <>
            <SelectLineType />
            <SelectSize />
          </>
        )}
      </Box>
      <Box display={'flex'} sx={{ height: '45px' }} gap={'5px'}>
        <Tooltip title={TooltipTitle.deleteLine} placement="top">
          <IconButton color="error" onClick={() => dispatch(deleteCurrent())}>
            {ActionsOnConva.deleteIcon}
          </IconButton>
        </Tooltip>
        <Tooltip title={TooltipTitle.save} placement="top">
          <IconButton color="primary">{ActionsOnConva.saveIcon}</IconButton>
        </Tooltip>
        <Tooltip title={TooltipTitle.saveAs} placement="top">
          <IconButton color="primary">{ActionsOnConva.saveAs}</IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
