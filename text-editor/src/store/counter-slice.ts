import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../utils/get-users';
import type { RootState } from './store';

interface CounterState {
  value: number;
  users: User[];
}

const initialState: CounterState = {
  value: 0,
  users: [],
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      return { ...state, users: action.payload };
    },
  },
});

export const { increment, decrement, setUsers } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export const counter = counterSlice.reducer;
