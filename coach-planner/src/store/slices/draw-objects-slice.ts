import { type PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ArrowLine, DrawObjectsState, Equipment, LineTypes, Player, PlayerTypes, getObjectWithId } from './constants';

const initialState: DrawObjectsState = {
  current: null,
  lines: null,
  players: null,
  equipment: null,
};
type PlayerProps = Omit<Player, 'id'>;
type ArrowLineProps = Omit<ArrowLine, 'id'>;
type EquipmentProps = Omit<Equipment, 'id'>;
const drawObjectsSlice = createSlice({
  name: 'draw-objects',
  initialState,
  reducers: {
    addLine(state, action: PayloadAction<ArrowLineProps>) {
      const newLine = getObjectWithId(action.payload);
      if (state.lines) {
        state.lines[newLine.id] = newLine;
      } else {
        const newState = { [newLine.id]: newLine };
        state.lines = newState;
      }
      state.current = newLine.id;
    },
    setCurrent(state, action: PayloadAction<string | null>) {
      state.current = action.payload;
    },
    drawLine(state, action: PayloadAction<number[]>) {
      if (state.lines && state.current) {
        state.lines[state.current].points = [...state.lines[state.current].points, ...action.payload];
      }
    },
    setPoint(state, action: PayloadAction<number[]>) {
      if (state.current) {
        if (state.lines?.[state.current]) state.lines[state.current].points = action.payload;
        if (state.players?.[state.current]) state.players[state.current].point = action.payload;
      }
    },
    deleteCurrent(state) {
      if (state.current) {
        if (state.lines?.[state.current]) delete state.lines[state.current];
        if (state.players?.[state.current]) delete state.players[state.current];
        if (state.equipment?.[state.current]) delete state.equipment[state.current];
      }
    },
    setColor(state, action: PayloadAction<string>) {
      if (state.current) {
        if (state.lines?.[state.current]) state.lines[state.current].color = action.payload;
        if (state.players?.[state.current]) state.players[state.current].color = action.payload;
        if (state.equipment?.[state.current]) state.equipment[state.current].color = action.payload;
      }
    },
    setLineType(state, action: PayloadAction<LineTypes>) {
      if (state.lines && state.current) state.lines[state.current].line = action.payload;
    },
    setLineWidth(state, action: PayloadAction<number>) {
      if (state.lines && state.current) state.lines[state.current].width = action.payload;
    },
    addPlayer(state, action: PayloadAction<PlayerProps>) {
      const newPlayer = getObjectWithId(action.payload);
      if (state.players) {
        state.players[newPlayer.id] = newPlayer;
      } else {
        const newState = { [newPlayer.id]: newPlayer };
        state.players = newState;
      }
      state.current = newPlayer.id;
    },
    setPlayerType(state, action: PayloadAction<PlayerTypes>) {
      if (state.players && state.current) state.players[state.current].type = action.payload;
    },
    addEquipment(state, action: PayloadAction<EquipmentProps>) {
      const equipment = getObjectWithId(action.payload);
      if (state.equipment) {
        state.equipment[equipment.id] = equipment;
      } else {
        const newState = { [equipment.id]: equipment };
        state.equipment = newState;
      }
      state.current = equipment.id;
    },

    setRotation(state, action: PayloadAction<number>) {
      if (state.current) {
        if (state.equipment?.[state.current]) state.equipment[state.current].rotation = action.payload;
      }
    },
  },
});

export const {
  addLine,
  addPlayer,
  drawLine,
  setCurrent,
  deleteCurrent,
  setLineType,
  setLineWidth,
  setColor,
  setPlayerType,
  setPoint,
  addEquipment,
  setRotation,
} = drawObjectsSlice.actions;

const selectDraw = (state: RootState) => state.draw;

export const selectLinesObject = createSelector([selectDraw], (draw) => (draw.lines ? Object.values(draw.lines) : []));
export const selectCurrentId = createSelector([selectDraw], (draw) => draw.current);

export const selectPlyersObject = createSelector([selectDraw], (draw) =>
  draw.players ? Object.values(draw.players) : [],
);

export const selectEquipmentObject = createSelector([selectDraw], (draw) =>
  draw.equipment ? Object.values(draw.equipment) : [],
);

export default drawObjectsSlice.reducer;
