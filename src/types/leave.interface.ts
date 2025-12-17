export interface LeaveI {
  _id: Object;
  student: Object;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: "pending" | "approved" | "rejected";
  approvedBy: Object;
}
// export interface CreateLeaveI extends Partial<LeaveI> {}
export type CreateLeaveI = Pick<
  LeaveI,
  "student" | "startDate" | "endDate" | "reason" | "status"
>;

// export interface ReviewLeave extends Partial<LeaveI> {}
export type ReviewLeave = Pick<LeaveI, "_id" | "status">;
