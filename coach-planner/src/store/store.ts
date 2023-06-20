import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import toastr from "./slices/toastr-slice";
import canvas from "./slices/canvas-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    toastr,
    canvas,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
