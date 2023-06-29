// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// interface CreateUserBody {
//   email: string;
//   password: string;
// }

// export const createUser = createAsyncThunk(
//   "user/createUser",
//   async (body: CreateUserBody, thunkAPI) => {
//     const auth = getAuth();
//     try {
//       const { user } = await createUserWithEmailAndPassword(
//         auth,
//         body.email,
//         body.password
//       );
//       return user;
//     } catch (error) {
//       thunkAPI.rejectWithValue(error);
//     }
//   }
// );
