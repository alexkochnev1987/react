import { Schema, model } from "mongoose";

const User = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  roles: [{ type: String, ref: "Role" }],
  picture: { type: String },
});

export default model("User", User);
