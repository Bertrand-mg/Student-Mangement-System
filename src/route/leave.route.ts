import express, { Router } from "express";
import { LeaveController } from "../controller/leave.controller";
import {
  authenticationValidation,
  authorizationValidation,
  validateMiddleware,
} from "../middleware";
import {
  JoiCreateLeaveSchemaValidation,
  JoiReviewLeaveValidation,
} from "../schema";

const leaveRoute: Router = express.Router();
const leaveController = new LeaveController();

leaveRoute.get(
  "/",
  authenticationValidation,
  authorizationValidation("admin"),
  leaveController.getAllLeaves
);

leaveRoute.get(
  "/student",
  authenticationValidation,
  authorizationValidation("student"),
  leaveController.getAllLeavesByStudent
);

leaveRoute.post(
  "/",
  authenticationValidation,
  authorizationValidation("student"),
  validateMiddleware(JoiCreateLeaveSchemaValidation),
  leaveController.requestLeave
);

leaveRoute.put(
  "/",
  authenticationValidation,
  authorizationValidation("admin"),
  validateMiddleware(JoiReviewLeaveValidation, "query"),
  leaveController.reviewLeaveRequest
);

export default leaveRoute;
