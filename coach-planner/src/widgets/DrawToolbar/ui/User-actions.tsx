import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Box, SelectChangeEvent } from '@mui/material';
import {
  selectColor,
  selectEquipmentType,
  selectLineType,
  selectLineWidth,
  selectPlayerType,
  selectUserAction,
  setColor,
  setEquipmentType,
  setLineType,
  setPlayerType,
  setUserAction,
  setWidth,
} from '../../../store/slices/canvas-slice';
import { ActionsOnConva, TooltipTitle, lineTypesArray, playerTypesArray, toolsTypesArray } from './constants';
import { deleteCurrent, setCurrent } from '../../../store/slices/draw-objects-slice';
import { ColorTypes, EquipmentTypes, LineTypes, PlayerTypes, UserActionsValues } from '../../../store/slices/constants';
import { ToolIconButton } from '@/shared/ui/ToolIconButton/ui/ToolIconButton';
import { RenderButtonList } from '@/entities/DrawActionButtons/RenderButtonList';
import { SelectLine, SelectTypes } from '@/entities/SelectLine/ui/SelectLine';
import { SaveImageButtons } from '@/entities/DrawActionButtons/SaveImageButton';

export const UserActions = ({ saveImageHandler }: { saveImageHandler: (id: string | undefined) => Promise<void> }) => {
  const dispatch = useAppDispatch();
  const lineType = useAppSelector(selectLineType);
  const size = useAppSelector(selectLineWidth);
  const color = useAppSelector(selectColor);
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

  return (
    <Box display={'flex'} alignItems={'center'} gap={'5px'} sx={{ height: '55px' }} justifyContent={'space-between'}>
      <Box display={'flex'} gap={'5px'}>
        <ToolIconButton
          color="error"
          onClick={() => dispatch(deleteCurrent())}
          toolTipTitle={TooltipTitle.deleteLine}
          isActive={false}
        >
          {ActionsOnConva.deleteIcon}
        </ToolIconButton>
        <RenderButtonList arr={lineTypesArray} callback={setUserActionHandler} data={userAction} />
        <SelectLine onChange={onChangeColor} value={color} selectType={SelectTypes.COLOR} />
        {userAction === UserActionsValues.addPlayer && (
          <RenderButtonList arr={playerTypesArray} callback={playerTypeHandler} data={playerType} />
        )}

        {(userAction === UserActionsValues.draw || userAction === UserActionsValues.select) && (
          <>
            <SelectLine onChange={onChangeLineType} value={lineType} selectType={SelectTypes.LINE} />
            <SelectLine onChange={onChangeSize} value={`${size}`} selectType={SelectTypes.SIZE} />
          </>
        )}

        {userAction === UserActionsValues.addEquipment && (
          <RenderButtonList arr={toolsTypesArray} callback={setToolActionHandler} data={equipmentType} />
        )}
      </Box>
      <SaveImageButtons saveImage={saveImageHandler} />
    </Box>
  );
};
