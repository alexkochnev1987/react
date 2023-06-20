import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum LineTypes {
  forward = "forward",
  backward = "backward",
  pass = "pass",
  forwardPuck = "puckForward",
  backwardPuck = "puckBackward",
  shot = "shot",
}

export enum ColorTypes {
  red = "red",
  blue = "blue",
  black = "black",
  green = "green",
  white = "white",
}
export enum UserActionsValues {
  select = "select",
  draw = "draw",
  drag = "drag",
  polyline = "polyline",
}

export interface CanvasState {
  lineType: LineTypes;
  color: ColorTypes;
  lineWidth: number;
  userAction: UserActionsValues;
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
};

const canvasSlice = createSlice({
  name: "canvas",
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
  },
});

export const { setLineType, setColorWidth, setUserAction, setWidth, setColor } =
  canvasSlice.actions;

export default canvasSlice.reducer;
