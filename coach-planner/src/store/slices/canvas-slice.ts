import { type PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  CanvasState,
  ColorTypes,
  ColorWidth,
  EquipmentTypes,
  LineTypes,
  PlayerTypes,
  UserActionsValues,
} from './constants';

const initialState: CanvasState = {
  lineType: LineTypes.forward,
  color: ColorTypes.red,
  lineWidth: 1,
  userAction: UserActionsValues.draw,
  playerType: PlayerTypes.circle,
  equipmentType: EquipmentTypes.puck,
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setLineType(state, action: PayloadAction<LineTypes>) {
      state.lineType = action.payload;
    },
    setColorWidth(state, action: PayloadAction<ColorWidth>) {
      state.color = action.payload.color;
      state.lineWidth = action.payload.lineWidth;
    },
    setColor(state, action: PayloadAction<ColorTypes>) {
      state.color = action.payload;
    },
    setWidth(state, action: PayloadAction<number>) {
      state.lineWidth = action.payload;
    },
    setUserAction(state, action: PayloadAction<UserActionsValues>) {
      state.userAction = action.payload;
    },
    setPlayerType(state, action: PayloadAction<PlayerTypes>) {
      state.playerType = action.payload;
    },
    setEquipmentType(state, action: PayloadAction<EquipmentTypes>) {
      state.equipmentType = action.payload;
    },
  },
});

export const { setLineType, setColorWidth, setUserAction, setWidth, setColor, setPlayerType, setEquipmentType } =
  canvasSlice.actions;

const selectCanvas = (state: RootState) => state.canvas;

export const selectColor = createSelector([selectCanvas], (canvas) => canvas.color);
export const selectLineType = createSelector([selectCanvas], (canvas) => canvas.lineType);
export const selectLineWidth = createSelector([selectCanvas], (canvas) => canvas.lineWidth);
export const selectUserAction = createSelector([selectCanvas], (canvas) => canvas.userAction);
export const selectPlayerType = createSelector([selectCanvas], (canvas) => canvas.playerType);
export const selectEquipmentType = createSelector([selectCanvas], (canvas) => canvas.equipmentType);

export default canvasSlice.reducer;
