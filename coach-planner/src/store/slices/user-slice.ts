import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUser } from "./asynk-thunks/create-user";
import { loginUserByEmail, loginWithGoogle } from "./asynk-thunks/login-user";
import { getAuth } from "firebase/auth";

interface UserState {
  email: null | string;
  id: null | string;
  isAuth: boolean;
  token: null | string;
  loading: boolean;
  photo: string;
  error: string;
}

const initialState: UserState = {
  email: null,
  id: null,
  token: null,
  isAuth: false,
  loading: false,
  photo: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser(state) {
      const auth = getAuth();
      auth.signOut();
      localStorage.removeItem("token");
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        const email = action.payload?.email;
        const id = action.payload?.uid;
        if (email) state.email = email;
        if (id) state.id = id;
      })

      .addCase(loginUserByEmail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUserByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        const email = action.payload?.email;
        const id = action.payload?.id;
        if (email) state.email = email;
        if (id) state.id = id;
      })
      .addCase(loginWithGoogle.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        const email = action.payload?.email;
        const id = action.payload?.id;
        const photo = action.payload?.photo;
        if (email) state.email = email;
        if (id) state.id = id;
        if (photo) state.photo = photo;
      })
      .addMatcher(isError, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

export const { removeUser } = userSlice.actions;

export default userSlice.reducer;
