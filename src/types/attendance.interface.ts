export type AttendanceI = {
  student: string;
  status: "present" | "absent" | "late" | "excused";
};

export interface CreateAttendancesI {
  attendances: AttendanceI[];
}
