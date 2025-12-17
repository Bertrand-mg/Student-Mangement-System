import { Request, Response } from "express";
import { ResponseService } from "../util";
import { LeaveService } from "../service/leave.service";
import { CreateLeaveI, LeaveI, ReviewLeave } from "../types/leave.interface";
import { AuthRequest } from "../middleware";

const leaveService = new LeaveService();
const responseService = new ResponseService();

export class LeaveController {
  getAllLeaves = async (req: Request, res: Response) => {
    responseService.response({
      res,
      message: "Retrieved All Leaves Successfully",
      data: await leaveService.fetchAllLeaves(),
    });
  };

  getAllLeavesByStudent = async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId)
      return responseService.response({
        res,
        statusCode: 404,
        message: "User not Found",
      });
    responseService.response({
      res,
      message: "Student Leaves Retrieved Successfully",
      data: await leaveService.fetchLeaveByUserId(userId),
    });
  };
  requestLeave = async (req: AuthRequest, res: Response) => {
    try {
      const { reason, startDate } = req.body;
      let { endDate } = req.body;
      const studentId = req.user?.id as string;

      if (endDate === undefined) endDate = startDate;

      const leave: CreateLeaveI = {
        student: studentId,
        startDate,
        endDate,
        reason,
        status: "pending",
      };

      responseService.response({
        res,
        statusCode: 201,
        message: "Leave Request is Pending",
        data: await leaveService.createLeave(leave),
      });
    } catch (error) {
      const { message, stack } = error as Error;
      return responseService.response({
        res,
        statusCode: 500,
        message,
        data: stack,
      });
    }
  };
  reviewLeaveRequest = async (req: AuthRequest, res: Response) => {
    try {
      const { _id, status } = req.query as unknown as ReviewLeave;
      const adminId = req.user?.id as string;

      const leave = (await leaveService.fetchLeaveById(_id)) as LeaveI;

      if (!leave) {
        return responseService.response({
          res,
          statusCode: 404,
          message: "Leave not found",
        });
      }

      leave.status = status;
      leave.approvedBy = adminId;

      const reviewedLeave = await leaveService.updateLeave(leave);

      if (reviewedLeave.modifiedCount > 0)
        return responseService.response({
          res,
          message: "Leave Request Updated",
          data: await leaveService.fetchLeaveById(_id),
        });
      else
        return responseService.response({
          res,
          statusCode: 400,
          message: "Leave Request Not Updated",
        });
    } catch (error) {
      const { message, stack } = error as Error;
      return responseService.response({
        res,
        statusCode: 500,
        message,
        data: stack,
      });
    }
  };
}
