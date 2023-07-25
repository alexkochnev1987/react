import { configureStore } from '@reduxjs/toolkit';
import canvas from './slices/canvas-slice';
import draw from './slices/draw-objects-slice';
import userExercises from './slices/userExercisesSlice';
import exercise from './slices/exerciseSlice';

export const store = configureStore({
  reducer: {
    userExercises,
    canvas,
    draw,
    exercise,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
