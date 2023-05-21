import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user-slice";
import toastr from "./slices/toastr-slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    toastr,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
