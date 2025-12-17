import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

interface ResponseI<T> {
  res: Response;
  statusCode?: number;
  success?: boolean;
  message: string;
  data?: T;
  error?: any;
}

export class ResponseService {
  response = <T>({
    res,
    statusCode = 200,
    success = true,
    message,
    data,
    error,
  }: ResponseI<T>) => {
    if (statusCode >= 200 && statusCode <= 299) {
      success = true;
      error = undefined;
    }

    if (statusCode >= 300 && statusCode <= 599) {
      success = false;
      error = data;
      data = undefined;
    }

    return res.status(statusCode).json({
      statusCode,
      success,
      message,
      data,
      error,
    });
  };
}
