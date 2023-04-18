// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IUser } from '../models/iuser';
import type { Dispatcher, RootState, TypedThunk } from './store';

// interface UserState {
//   isLogged: boolean;
// }

// const initialState: UserState = {
//   user: null,
//   isLogged: false,
// };

// export const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<IUser>) => {
//       state.user = action.payload;
//       state.isLogged = true;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.isLogged = false;
//     },
//   },
// });
interface UserState {
  users: IUser[] | null;
  loading: boolean;
  error: null | string;
}

const initialState: UserState = {
  users: null,
  loading: false,
  error: null,
};
enum UserActionTypes {
  FETCH_USERS = 'FETCH_USERS',
  FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
  FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
}

interface FetchUserAction {
  type: UserActionTypes.FETCH_USERS;
}

interface FetchUserSuccessAction {
  type: UserActionTypes.FETCH_USERS_SUCCESS;
  payload: IUser[];
}

interface FetchUserErrorAction {
  type: UserActionTypes.FETCH_USERS_ERROR;
  payload: string;
}

type UserAction = FetchUserAction | FetchUserErrorAction | FetchUserSuccessAction;
export const userReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.FETCH_USERS:
      return { users: null, loading: true, error: null };
    case UserActionTypes.FETCH_USERS_SUCCESS:
      return { users: action.payload, loading: false, error: null };
    case UserActionTypes.FETCH_USERS_ERROR:
      return { users: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUsers = () => async (dispatch: Dispatch<UserAction>) => {
  dispatch({ type: UserActionTypes.FETCH_USERS });
  try {
    const { data } = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');

    dispatch({ type: UserActionTypes.FETCH_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UserActionTypes.FETCH_USERS_ERROR,
      payload: 'Error occurs, when data is loading',
    });
  }
};

// export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

// export const userReducer = userSlice.reducer;
