import express, { Router } from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";
import attendanceRoute from "./attendance.route";
import leaveRoute from "./leave.route";

const mainRoute: Router = express();
mainRoute.use("/user", userRoute);
mainRoute.use("/auth", authRoute);
mainRoute.use("/attendance", attendanceRoute);
mainRoute.use("/leave", leaveRoute);

export default mainRoute;
