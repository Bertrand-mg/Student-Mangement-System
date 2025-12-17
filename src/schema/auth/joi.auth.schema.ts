import Joi from "joi";

export const JoiRegisterUserSchemaValidation = Joi.object({
  fullName: Joi.string().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("admin", "student").required(),
  password: Joi.string().required(),
  isActive: Joi.boolean().required(),
});

export const JoiLoginUserSchemaValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
