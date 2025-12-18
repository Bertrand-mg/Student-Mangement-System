import Joi from "joi";
import { CreateUserInterface, LoginInterface } from "../../types";

export const JoiRegisterUserSchemaValidation = Joi.object<CreateUserInterface>({
  fullName: Joi.string().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("admin", "student"),
  password: Joi.string().required(),
  isActive: Joi.boolean().required(),
});

export const JoiLoginUserSchemaValidation = Joi.object<LoginInterface>({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
