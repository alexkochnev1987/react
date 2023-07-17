import { configureStore } from '@reduxjs/toolkit';
import canvas from './slices/canvas-slice';
import draw from './slices/draw-objects-slice';
import user from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user,
    canvas,
    draw,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
