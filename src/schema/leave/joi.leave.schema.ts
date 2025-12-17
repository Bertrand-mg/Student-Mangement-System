import Joi from "joi";

export const JoiCreateLeaveSchemaValidation = Joi.object({
  reason: Joi.string().required(),
  startDate: Joi.date().greater("now").required(),
  endDate: Joi.date().min(Joi.ref("startDate")),
});

export const JoiReviewLeaveValidation = Joi.object({
  _id: Joi.string().required(),
  status: Joi.string().valid("approved", "rejected").required(),
});
