import { type PayloadAction, createSlice, createSelector } from '@reduxjs/toolkit';
import { LineTypes } from './canvas-slice';
import { uuidv4 } from '@firebase/util';
import { RootState } from '../store';

export interface ArrowLine {
  id: string;
  points: number[];
  color: string;
  line: LineTypes;
  width: number;
}

type ArrowLineProps = Omit<ArrowLine, 'id'>;

const getArrowObject = (object: ArrowLineProps) => ({
  ...object,
  id: uuidv4(),
});

export enum PlayerTypes {
  circle = 'circle',
  triangle = 'triangle',
  square = 'square',
}

export interface Player {
  point: number[];
  color: string;
  type: PlayerTypes;
  id: string;
}

type PlayerProps = Omit<Player, 'id'>;

const getPlayerObject = (props: PlayerProps) => ({ ...props, id: uuidv4() });

export interface DrawObjectsState {
  current: string | null;
  lines: { [key: string]: ArrowLine } | null;
  players: { [key: string]: Player } | null;
}

const initialState: DrawObjectsState = {
  current: null,
  lines: null,
  players: null,
};

const drawObjectsSlice = createSlice({
  name: 'draw-objects',
  initialState,
  reducers: {
    addLine(state, action: PayloadAction<ArrowLineProps>) {
      const newLine = getArrowObject(action.payload);
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
    changeLine(state, action: PayloadAction<number[]>) {
      if (state.lines && state.current) {
        state.lines[state.current].points = action.payload;
      }
    },
    deleteCurrent(state) {
      if (state.lines && state.current) delete state.lines[state.current];
      if (state.players && state.current) delete state.players[state.current];
    },
    setLineColor(state, action: PayloadAction<string>) {
      if (state.lines && state.current) state.lines[state.current].color = action.payload;
    },
    setLineType(state, action: PayloadAction<LineTypes>) {
      if (state.lines && state.current) state.lines[state.current].line = action.payload;
    },
    setLineWidth(state, action: PayloadAction<number>) {
      if (state.lines && state.current) state.lines[state.current].width = action.payload;
    },
    addPlayer(state, action: PayloadAction<PlayerProps>) {
      const newPlayer = getPlayerObject(action.payload);
      if (state.players) {
        state.players[newPlayer.id] = newPlayer;
      } else {
        const newState = { [newPlayer.id]: newPlayer };
        state.players = newState;
      }
      state.current = newPlayer.id;
    },
    setUserColor(state, action: PayloadAction<string>) {
      if (state.players && state.current) state.players[state.current].color = action.payload;
    },
    setUserType(state, action: PayloadAction<PlayerTypes>) {
      if (state.players && state.current) state.players[state.current].type = action.payload;
    },
    setUserPoint(state, action: PayloadAction<number[]>) {
      if (state.players && state.current) state.players[state.current].point = action.payload;
    },
  },
});

export const {
  addLine,
  addPlayer,
  changeLine,
  drawLine,
  setCurrent,
  deleteCurrent,
  setLineType,
  setLineColor,
  setLineWidth,
  setUserColor,
  setUserType,
  setUserPoint,
} = drawObjectsSlice.actions;

const selectDraw = (state: RootState) => state.draw;

export const selectLinesObject = createSelector([selectDraw], (draw) => (draw.lines ? Object.values(draw.lines) : []));
export const selectCurrentId = createSelector([selectDraw], (draw) => draw.current);

export const selectPlyersObject = createSelector([selectDraw], (draw) =>
  draw.players ? Object.values(draw.players) : [],
);

export default drawObjectsSlice.reducer;
