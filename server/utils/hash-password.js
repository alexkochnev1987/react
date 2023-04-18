import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../auth/config.js";

export const hashPassword = (password) => bcryptjs.hashSync(password, 7);
export const isValidPassword = (bodyPassword, userPassword) =>
  bcryptjs.compareSync(bodyPassword, userPassword);

export const generateToken = (userId, roles) => {
  const payload = { id: userId, roles: roles };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  return token;
};

export const decodeData = (token) => jwt.verify(token, SECRET_KEY);
