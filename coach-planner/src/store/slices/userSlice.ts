import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserState {
  userUiid: string;
}

const initialState: UserState = {
  userUiid: '',
};

const userSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.userUiid = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

const selectCanvas = (state: RootState) => state.user;

export const selectUser = createSelector([selectCanvas], (user) => user.userUiid);

export default userSlice.reducer;
