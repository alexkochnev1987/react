import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Box, IconButton, Tooltip } from '@mui/material';
import {
  selectEquipmentType,
  selectPlayerType,
  selectUserAction,
  setEquipmentType,
  setPlayerType,
  setUserAction,
} from '../../store/slices/canvas-slice';
import { SelectColor } from './Tools/Select-color';
import { SelectLineType } from './Tools/Line';
import { SelectSize } from './Tools/Select-size';
import { ActionsOnConva, TooltipTitle, lineTypesArray, playerTypesArray, toolsTypesArray } from './constants';
import { deleteCurrent } from '../../store/slices/draw-objects-slice';
import { IconButtonForTool } from './Tools/IconForTool';
import { EquipmentTypes, UserActionsValues } from '../../store/slices/constants';

export const UserActions = ({ saveImage }: { saveImage: () => Promise<void> }) => {
  const dispatch = useAppDispatch();
  const userAction = useAppSelector(selectUserAction);
  const playerType = useAppSelector(selectPlayerType);
  const equipmentType = useAppSelector(selectEquipmentType);
  const setUserActionHandler = (value: UserActionsValues) => dispatch(setUserAction(value));
  const setToolActionHandler = (value: EquipmentTypes) => dispatch(setEquipmentType(value));

  return (
    <Box display={'flex'} alignItems={'center'} gap={'5px'} sx={{ height: '60px' }} justifyContent={'space-between'}>
      <Box display={'flex'} sx={{ height: '45px' }} gap={'5px'}>
        {lineTypesArray.map((x) => (
          <IconButtonForTool
            color="primary"
            key={x.value}
            onClick={() => setUserActionHandler(x.value)}
            isActive={userAction === x.value}
          >
            {x.icon}
          </IconButtonForTool>
        ))}
        <SelectColor />
        {userAction === UserActionsValues.addPlayer &&
          playerTypesArray.map((x) => (
            <IconButtonForTool
              color="primary"
              key={x.value}
              isActive={playerType === x.value}
              onClick={() => dispatch(setPlayerType(x.value))}
            >
              {x.icon}
            </IconButtonForTool>
          ))}
        {(userAction === UserActionsValues.draw || userAction === UserActionsValues.select) && (
          <>
            <SelectLineType />
            <SelectSize />
          </>
        )}

        {userAction === UserActionsValues.addEquipment && (
          <>
            {toolsTypesArray.map((x) => (
              <IconButtonForTool
                isActive={equipmentType === x.value}
                key={x.value}
                src={x.svgIcon}
                onClick={() => setToolActionHandler(x.value)}
              />
            ))}
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
          <IconButton color="primary" onClick={saveImage}>
            {ActionsOnConva.saveIcon}
          </IconButton>
        </Tooltip>
        <Tooltip title={TooltipTitle.saveAs} placement="top">
          <IconButton color="primary">{ActionsOnConva.saveAs}</IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
