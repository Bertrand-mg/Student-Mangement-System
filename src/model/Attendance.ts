import { required } from "joi";
import mongoose, { Schema, Types } from "mongoose";

const AttendanceSchema = new Schema(
  {
    student: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      require: true,
    },
    status: {
      type: String,
      enum: ["present", "absent", "late", "excused"],
      required: true,
    },
  },
  { timestamps: true }
);

export const AttendanceModel = mongoose.model("Attendance", AttendanceSchema);
