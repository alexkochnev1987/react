import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getExerciseById, updateExercise } from '@/service/exercise.service';
import { ExerciseForPage } from '@/service/parseExerciseResponse';
import { UpdateExerciseBody } from '@/db/constants';

interface ExerciseState {
  exercise: ExerciseForPage | null;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: ExerciseState = {
  exercise: null,
  loading: false,
  error: null,
};

export const fetchExercise = createAsyncThunk(
  'exercise/fetchExercise',
  async (id: string, thunkAPI) => {
    const response = await getExerciseById(id);
    return response;
  },
);
export const updateExerciseFunction = createAsyncThunk(
  'exercise/updateExercise',
  async ({ id, exercise }: { id: string; exercise: Partial<UpdateExerciseBody> }) => {
    await updateExercise(id, exercise);
  },
);

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExercise.fulfilled, (state, action) => {
      state.loading = false;
      state.exercise = action.payload;
    });
    builder.addCase(fetchExercise.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchExercise.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateExerciseFunction.fulfilled, (state, action) => {});
    builder.addCase(updateExerciseFunction.pending, (state, action) => {
      state.error = null;
    });
    builder.addCase(updateExerciseFunction.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

const selectExercise = (state: RootState) => state.exercise;

export const exerciseState = createSelector([selectExercise], (state) => state);

export const {} = exerciseSlice.actions;
export default exerciseSlice.reducer;