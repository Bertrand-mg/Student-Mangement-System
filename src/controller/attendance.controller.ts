import { Request, Response } from "express";
import { AttendanceService, UserService } from "../service";
import { ResponseService } from "../util";
import { AttendanceI, CreateAttendancesI } from "../types";
import { LeaveService } from "../service/leave.service";
import { AuthRequest } from "../middleware";

const attendanceService = new AttendanceService();
const userService = new UserService();
const leaveService = new LeaveService();
const responseService = new ResponseService();

export class AttendanceController {
  getAllAttendances = async (req: Request, res: Response) => {
    try {
      responseService.response({
        res,
        message: "Attendance Retrieved Succesfully",
        data: await attendanceService.getAllAttendances(),
      });
    } catch (error) {
      const { message, stack } = error as Error;
      responseService.response({
        res,
        statusCode: 500,
        message,
        data: stack,
      });
    }
  };

  getStudentAttendances = async (req: AuthRequest, res: Response) => {
    try {
      const student = req.user?.id as string;
      if (!student)
        responseService.response({
          res,
          statusCode: 404,
          message: "User not Found",
        });
      responseService.response({
        res,
        message: "Attendance Retrieved Succesfully",
        data: await attendanceService.fetchStudentAttendaces(student),
      });
    } catch (error) {
      const { message, stack } = error as Error;
      responseService.response({
        res,
        statusCode: 500,
        message,
        data: stack,
      });
    }
  };

  makeAttendace = async (req: Request, res: Response) => {
    try {
      const { attendances } = req.body as CreateAttendancesI;

      const data = [];

      for (const attendance of attendances) {
        const user = await userService.fetchUserById(attendance.student);

        if (!user || user.role !== "student") {
          data.push({
            attendance,
            error: "Student not Found",
          });
          continue;
        }

        const activeLeaves = await leaveService.fetchActiveLeaves({
          student: attendance.student,
        });

        if (activeLeaves.length > 0) attendance.status = "excused";

        const savedAttendance = await attendanceService.createAttendances(
          attendance
        );
        data.push(savedAttendance);
      }

      return responseService.response({
        res,
        statusCode: 201,
        message: `Attendance taken Successfully.`,
        data,
      });
    } catch (error) {
      const { message, stack } = error as Error;
      responseService.response({
        res,
        statusCode: 500,
        message,
        data: stack,
      });
    }
  };
}
