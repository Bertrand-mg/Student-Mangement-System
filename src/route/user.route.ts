import express from "express";
import { UserController } from "../controller";
import {
  authenticationValidation,
  authorizationValidation,
  validateMiddleware,
} from "../middleware";
const userRoute = express.Router();
const userController = new UserController();

userRoute.get(
  "/all",
  authenticationValidation,
  authorizationValidation("admin"),
  userController.getAllUsers
);
userRoute.get(
  "/profile",
  authenticationValidation,
  userController.getUserProfile
);

export default userRoute;
