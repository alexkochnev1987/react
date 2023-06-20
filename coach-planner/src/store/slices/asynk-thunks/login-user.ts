import { createAsyncThunk } from "@reduxjs/toolkit";
import { FirebaseError } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

interface LoginUserBody {
  email: string;
  password: string;
}

export const loginUserByEmail = createAsyncThunk(
  "user/loginWithEmail",
  async (body: LoginUserBody, thunkAPI) => {
    const auth = getAuth();
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        body.email,
        body.password
      );

      const { token } = await user.getIdTokenResult();

      const userData = { email: user.email, id: user.uid, token };
      return userData;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return thunkAPI.rejectWithValue(error.message);
      }
      thunkAPI.rejectWithValue("Server ERROR");
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (_, thunkAPI) => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(response);
      if (credential) {
        const token = credential.accessToken;
        if (token) localStorage.setItem("token", token);
        const user = response.user;
        const userData = {
          email: user.email,
          id: user.uid,
          token,
          photo: user.photoURL,
        };
        return userData;
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        return thunkAPI.rejectWithValue(error.message);
      }
      thunkAPI.rejectWithValue("Server ERROR");
    }
  }
);
