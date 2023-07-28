import { useAppDispatch } from '../../../store/hooks';
import { Box, SelectChangeEvent } from '@mui/material';
import {
  setColor,
  setEquipmentType,
  setLineType,
  setPlayerType,
  setUserAction,
  setWidth,
} from '../../../store/slices/canvas-slice';
import {
  ActionsOnConva,
  TooltipTitle,
  lineTypesArray,
  playerTypesArray,
  toolsTypesArray,
} from './constants';
import { deleteCurrent, setCurrent } from '../../../store/slices/draw-objects-slice';
import {
  ColorTypes,
  EquipmentTypes,
  LineTypes,
  PlayerTypes,
  UserActionsValues,
} from '../../../store/slices/constants';
import { ToolIconButton } from '@/shared/ui/ToolIconButton/ui/ToolIconButton';
import { RenderButtonList } from '@/entities/DrawActionButtons/RenderButtonList';
import { SelectLine, SelectTypes } from '@/entities/SelectLine/ui/SelectLine';
import { ReactNode } from 'react';

export const UserActions = ({
  action,
  color,
  lineType,
  width,
  type,
  equipment,
  children,
}: {
  action: UserActionsValues;
  color: ColorTypes;
  lineType: LineTypes;
  width: number;
  type: PlayerTypes;
  equipment: EquipmentTypes;
  children?: ReactNode;
}) => {
  const dispatch = useAppDispatch();

  const setUserActionHandler = (value: UserActionsValues) => {
    if (action !== value) dispatch(setCurrent(null));
    dispatch(setUserAction(value));
  };
  const setToolActionHandler = (value: EquipmentTypes) => {
    dispatch(setEquipmentType(value));
  };

  const playerTypeHandler = (value: PlayerTypes) => {
    dispatch(setPlayerType(value));
  };

  const onChangeLineType = (e: SelectChangeEvent<string>) => {
    dispatch(setLineType(e.target.value as LineTypes));
  };
  const onChangeSize = (e: SelectChangeEvent<string>) => {
    const value = Number(e.target.value);
    dispatch(setWidth(value));
  };
  const onChangeColor = (e: SelectChangeEvent<string>) => {
    dispatch(setColor(e.target.value as ColorTypes));
  };

  const onDeleteElement = () => {
    dispatch(deleteCurrent());
  };

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      gap={'5px'}
      sx={{ minHeight: '55px' }}
      justifyContent={'space-between'}
    >
      <Box display={'flex'} gap={'5px'} flexWrap={'wrap'} sx={{ width: '100%' }}>
        <ToolIconButton
          color="error"
          onClick={onDeleteElement}
          toolTipTitle={TooltipTitle.deleteLine}
          isActive={false}
        >
          {ActionsOnConva.deleteIcon}
        </ToolIconButton>
        <RenderButtonList arr={lineTypesArray} callback={setUserActionHandler} data={action} />
        <SelectLine onChange={onChangeColor} value={color} selectType={SelectTypes.COLOR} />
        {action === UserActionsValues.addPlayer && (
          <RenderButtonList arr={playerTypesArray} callback={playerTypeHandler} data={type} />
        )}

        {(action === UserActionsValues.draw || action === UserActionsValues.select) && (
          <>
            <SelectLine
              onChange={onChangeLineType}
              value={lineType}
              selectType={SelectTypes.LINE}
            />
            <SelectLine onChange={onChangeSize} value={`${width}`} selectType={SelectTypes.SIZE} />
          </>
        )}

        {action === UserActionsValues.addEquipment && (
          <RenderButtonList
            arr={toolsTypesArray}
            callback={setToolActionHandler}
            data={equipment}
          />
        )}
        {children}
      </Box>
    </Box>
  );
};
