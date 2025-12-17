import express, { Router } from "express";
import { AuthController, UserController } from "../controller";
import { validateMiddleware } from "../middleware";
import {
  JoiLoginUserSchemaValidation,
  JoiRegisterUserSchemaValidation,
} from "../schema";

const authRoute: Router = express.Router();
const authController = new AuthController();

authRoute.post(
  "/register",
  validateMiddleware(JoiRegisterUserSchemaValidation),
  authController.register
);
authRoute.post(
  "/login",
  validateMiddleware(JoiLoginUserSchemaValidation),
  authController.login
);

export default authRoute;
