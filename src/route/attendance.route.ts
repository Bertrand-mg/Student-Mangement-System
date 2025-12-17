import express, { Router } from "express";
import { AttendanceController } from "../controller";
import {
  authenticationValidation,
  authorizationValidation,
  validateMiddleware,
} from "../middleware";
import { JoiCreateAttendanceSchema } from "../schema";

const attendanceRoute: Router = express.Router();
const attendanceController = new AttendanceController();

attendanceRoute.get(
  "/",
  authenticationValidation,
  authorizationValidation("admin"),
  attendanceController.getAllAttendances
);

attendanceRoute.get(
  "/student",
  authenticationValidation,
  authorizationValidation("student"),
  attendanceController.getStudentAttendances
);

attendanceRoute.post(
  "/",
  authenticationValidation,
  authorizationValidation("admin"),
  validateMiddleware(JoiCreateAttendanceSchema),
  attendanceController.makeAttendace
);

export default attendanceRoute;
