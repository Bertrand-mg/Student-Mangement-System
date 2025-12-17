import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { ResponseService } from "../util";

const responseService = new ResponseService();

type sourceType = "body" | "params" | "query";

export const validateMiddleware =
  (schema: ObjectSchema, type: sourceType = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = req[type];

    const { error, value } = schema.validate(data, { abortEarly: false });

    if (error) {
      return responseService.response({
        res,
        statusCode: 400,
        message: error.message,
        data: error.stack,
      });
    }

    if (type === "query") Object.assign(req[type], value);
    else req[type] = value;
    next();
  };
