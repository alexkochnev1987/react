import { type PayloadAction, createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ArrowLine, DrawObjectsState, Equipment, LineTypes, Player, PlayerTypes, getObjectWithId } from './constants';
import { AllDrawType } from '../../components/Conva/helpers';
import { updateExercise, uploadBlob } from '../../db/exercises';

const initialState: DrawObjectsState = {
  current: null,
  lines: null,
  players: null,
  equipment: null,
};
type PlayerProps = Omit<Player, 'id'>;
type ArrowLineProps = Omit<ArrowLine, 'id'>;
type EquipmentProps = Omit<Equipment, 'id'>;

export const loadFile = async (file: Blob, id: string | undefined, conva: AllDrawType) => {
  if (id) {
    const img = await uploadBlob(file, id);
    await updateExercise(id, { img, conva });
  }
};

export const saveImage = createAsyncThunk<string, { file: Blob; id: string | undefined }, { rejectValue: string }>(
  'draw/saveImage',
  async ({ file, id }, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const { players, lines, equipment } = state.draw;
    loadFile(file, id, { players, lines, equipment });
    return '';
  },
);
const drawObjectsSlice = createSlice({
  name: 'draw-objects',
  initialState,
  reducers: {
    // saveImage(state, action: PayloadAction<{ file: Blob; id: string | undefined }>) {
    //   const { players, lines, equipment } = state;
    //   const { file, id } = action.payload;
    //   loadFile(file, id, { players, lines, equipment });
    // },
    setImageNull(state) {
      state.equipment = null;
      state.lines = null;
      state.players = null;
      state.current = null;
    },
    setImage(state, action: PayloadAction<AllDrawType>) {
      state.equipment = action.payload.equipment;
      state.lines = action.payload.lines;
      state.players = action.payload.players;
    },
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
        if (state.equipment?.[state.current]) state.equipment[state.current].point = action.payload;
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
      if (state.current) {
        if (state.lines?.[state.current]) state.lines[state.current].line = action.payload;
      }
    },
    setLineWidth(state, action: PayloadAction<number>) {
      if (state.current) {
        if (state.lines?.[state.current]) state.lines[state.current].width = action.payload;
      }
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
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(saveImage.pending, (state) => {
  //       // state.loading = true;
  //       // state.error = undefined;
  //     })
  //     .addCase(saveImage.fulfilled, (state, action) => {
  //       // state.books = action.payload;
  //       // state.loading = false;
  //     })
  //     .addCase(saveImage.rejected, (state, action) => {
  //       // state.error = action.error.message;
  //       // state.loading = false;
  //     });
  // },
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
  setImage,
  setImageNull,
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

export const getAllDraw = createSelector([selectDraw], (draw) => ({
  lines: draw.lines,
  equipment: draw.equipment,
  players: draw.players,
}));

export default drawObjectsSlice.reducer;
