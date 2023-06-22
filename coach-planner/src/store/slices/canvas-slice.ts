import { type PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { PlayerTypes } from './draw-objects-slice';

export enum LineTypes {
  forward = 'forward',
  backward = 'backward',
  pass = 'pass',
  forwardPuck = 'puckForward',
  backwardPuck = 'puckBackward',
  shot = 'shot',
}

export enum ColorTypes {
  red = 'red',
  blue = 'blue',
  black = 'black',
  green = 'green',
  white = 'white',
}
export enum UserActionsValues {
  select = 'select',
  draw = 'draw',
  drag = 'drag',
  polyline = 'polyline',
  addPlayer = 'addPlayer',
}

export interface CanvasState {
  lineType: LineTypes;
  color: ColorTypes;
  lineWidth: number;
  userAction: UserActionsValues;
  playerType: PlayerTypes;
}

export interface ColorWidth {
  color: ColorTypes;
  lineWidth: number;
}

const initialState: CanvasState = {
  lineType: LineTypes.forward,
  color: ColorTypes.red,
  lineWidth: 1,
  userAction: UserActionsValues.draw,
  playerType: PlayerTypes.circle,
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
  },
});

export const { setLineType, setColorWidth, setUserAction, setWidth, setColor, setPlayerType } = canvasSlice.actions;
const selectCanvas = (state: RootState) => state.canvas;

export const selectColor = createSelector([selectCanvas], (canvas) => canvas.color);
export const selectLineType = createSelector([selectCanvas], (canvas) => canvas.lineType);
export const selectLineWidth = createSelector([selectCanvas], (canvas) => canvas.lineWidth);
export const selectUserAction = createSelector([selectCanvas], (canvas) => canvas.userAction);
export const selectPlayerType = createSelector([selectCanvas], (canvas) => canvas.playerType);

export default canvasSlice.reducer;
