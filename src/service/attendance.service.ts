import { AttendanceModel } from "../model";
import { AttendanceI } from "../types";

export class AttendanceService {
  getAllAttendances = async () => {
    return await AttendanceModel.find();
  };

  fetchStudentAttendaces = async (student: Object) => {
    return await AttendanceModel.find({ student });
  };

  createAttendances = async (attendance: AttendanceI) => {
    const newAttendance = await AttendanceModel.create({
      ...attendance,
      date: new Date().toISOString().split("T")[0],
    });
    await newAttendance.populate("student");

    return newAttendance;
  };
}
