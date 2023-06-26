import { createSlice } from '@reduxjs/toolkit';

export enum Severity {
  success = 'success',
  warning = 'warning',
  error = 'error',
  info = 'info',
}

export interface ToastrState {
  message: string;
  open: boolean;
  severity: Severity;
}

const initialState: ToastrState = {
  message: '',
  open: false,
  severity: Severity.success,
};

const toastrSlice = createSlice({
  name: 'toastr',
  initialState,
  reducers: {
    setToastr(state, action: PayloadAction<ToastrState>) {
      state.message = action.payload.message;
      state.open = action.payload.open;
      state.severity = action.payload.severity;
    },
  },
});

export const { setToastr } = toastrSlice.actions;

export default toastrSlice.reducer;
