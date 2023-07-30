import { PayloadAction, createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { deleteExercise, getUserExercises } from '@/service/exercise.service';
import { ExerciseForPage } from '@/service/parseExerciseResponse';

interface ExerciseState {
  exercises: ExerciseForPage[];
  loading: boolean;
  error: null | string | undefined;
}

const initialState: ExerciseState = {
  exercises: [],
  loading: false,
  error: null,
};

export const fetchUserExercises = createAsyncThunk('userExercises/fetchExercises', async () => {
  const response = await getUserExercises();
  return response;
});

export const deleteUserExercise = createAsyncThunk(
  'userExercises/deleteExercise',
  async (id: string, { dispatch }) => {
    dispatch(deleteExerciseAction(id));
    await deleteExercise(id);
  },
);

const userExerciseSlice = createSlice({
  name: 'userExercises',
  initialState,
  reducers: {
    deleteExerciseAction(state, action: PayloadAction<string>) {
      state.exercises = state.exercises.filter((x) => x.id !== action.payload);
    },
    changeExerciseAction(
      state,
      action: PayloadAction<{ id: string; exercise: Partial<ExerciseForPage> }>,
    ) {
      state.exercises = state.exercises.map((x) =>
        x.id !== action.payload.id ? x : { ...x, ...action.payload.exercise },
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserExercises.fulfilled, (state, action) => {
      state.loading = false;
      state.exercises = action.payload;
    });
    builder.addCase(fetchUserExercises.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserExercises.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(deleteUserExercise.fulfilled, (state, action) => {});
    builder.addCase(deleteUserExercise.pending, (state, action) => {
      state.error = null;
    });
    builder.addCase(deleteUserExercise.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

const selectUserExercises = (state: RootState) => state.userExercises;

export const userExercisesState = createSelector([selectUserExercises], (state) => state);
export const userExercisesErrorSelector = createSelector(
  [selectUserExercises],
  (user) => user.error,
);
export const userExercisesLoadingSelector = createSelector(
  [selectUserExercises],
  (user) => user.loading,
);

export const { deleteExerciseAction, changeExerciseAction } = userExerciseSlice.actions;
export default userExerciseSlice.reducer;
