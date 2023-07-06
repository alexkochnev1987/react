import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Box, Button, Tooltip } from '@mui/material';
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
import { deleteCurrent, setCurrent } from '../../store/slices/draw-objects-slice';
import { IconButtonForTool } from './Tools/IconForTool';
import { EquipmentTypes, UserActionsValues } from '../../store/slices/constants';

export const UserActions = () => {
  const dispatch = useAppDispatch();

  const userAction = useAppSelector(selectUserAction);
  const playerType = useAppSelector(selectPlayerType);
  const equipmentType = useAppSelector(selectEquipmentType);
  const setUserActionHandler = (value: UserActionsValues) => {
    if (userAction !== value) dispatch(setCurrent(null));
    dispatch(setUserAction(value));
  };
  const setToolActionHandler = (value: EquipmentTypes) => {
    dispatch(setEquipmentType(value));
  };

  return (
    <Box display={'flex'} alignItems={'center'} gap={'5px'} sx={{ height: '60px' }} justifyContent={'space-between'}>
      <Box display={'flex'} sx={{ height: '45px' }} gap={'5px'}>
        <Tooltip title={TooltipTitle.deleteLine} placement="top">
          <Button color="primary" onClick={() => dispatch(deleteCurrent())} variant="outlined">
            {ActionsOnConva.deleteIcon}
          </Button>
        </Tooltip>
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
              onClick={() => {
                dispatch(setPlayerType(x.value));
              }}
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

        {userAction === UserActionsValues.addEquipment &&
          toolsTypesArray.map((x) => (
            <IconButtonForTool
              isActive={equipmentType === x.value}
              key={x.value}
              src={x.svgIcon}
              onClick={() => setToolActionHandler(x.value)}
            />
          ))}
      </Box>
    </Box>
  );
};
