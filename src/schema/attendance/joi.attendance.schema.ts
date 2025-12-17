import Joi from "joi";

export const JoiCreateAttendanceSchema = Joi.object({
  attendances: Joi.array()
    .items(
      Joi.object({
        student: Joi.string().required(),
        status: Joi.string()
          .valid("present", "absent", "late", "excused")
          .required(),
      })
    )
    .min(1)
    .required(),
});

export const JoiUpdateAttendanceSchema = Joi.object({
  attendanceId: Joi.string().required(),
  status: Joi.string().valid("present", "absent", "late", "excused").required(),
});
