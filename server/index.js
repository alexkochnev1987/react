import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import router from "./router/post-router.js";
import authRouter from "./router/auth-router.js";
import { errorMiddleware } from "./middlewares/error-middleware.js";

config();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  })
);
app.use(express.static("static"));
app.use(fileUpload({}));
app.use("/api", router);
app.use("/auth", authRouter);
app.use(errorMiddleware);

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}

startApp();
