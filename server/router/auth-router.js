import { Router } from "express";
import authController from "../controllers/auth-controller.js";
import { check } from "express-validator";
import {
  authMiddleware,
  roleMiddleware,
} from "../middlewares/auth-middleware.js";

const authRouter = new Router();

authRouter.post(
  "/registration",
  [
    check("email").isEmail(),
    check("username").notEmpty(),
    check("password").isLength({ min: 5, max: 10 }),
  ],
  authController.registration
);
authRouter.post(
  "/login",
  [check("email").isEmail(), check("password").isLength({ min: 5, max: 10 })],
  authController.login
);

authRouter.post("/logout", authController.logout);

authRouter.get("/activate/:link", authController.activate);
authRouter.get("/refresh", authController.refresh);

authRouter.get(
  "/users",
  authMiddleware,
  // roleMiddleware(["user", "admin"]),
  authController.getUsers
);
authRouter.post("/role", authController.createRole);

export default authRouter;
