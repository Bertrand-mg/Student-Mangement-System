import { LeaveModel } from "../model";
import { CreateLeaveI, LeaveI } from "../types";

export class LeaveService {
  fetchAllLeaves = async (leave?: Partial<LeaveI>) => {
    return await LeaveModel.find({
      ...leave,
    }).populate("student");
  };

  fetchActiveLeaves = async (leave?: Partial<LeaveI>, today = new Date()) => {
    return await LeaveModel.find({
      ...leave,
      status: { $in: ["pending", "approved"] },
      startDate: { $lte: new Date() },
      endDate: { $gte: today },
    }).populate("student");
  };

  fetchLeaveById = async (id: Object) => {
    return await LeaveModel.findById(id).populate("student");
  };

  fetchLeaveByUserId = async (userId: Object) => {
    return await LeaveModel.find({ student: userId });
  };

  createLeave = async (leave: CreateLeaveI) => {
    const newLeave = await LeaveModel.create({
      ...leave,
    });

    await newLeave.populate("student");

    return newLeave;
  };

  updateLeave = async (leave: LeaveI) => {
    const { _id, ...updateData } = leave;

    return LeaveModel.updateOne({ _id }, { $set: updateData });
  };
}
