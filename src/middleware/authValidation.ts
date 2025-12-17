import { NextFunction, Request, Response } from "express";
import { GenerateTokenPayLoad, ResponseService } from "../util";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";

const responseService = new ResponseService();

export interface AuthRequest extends Request {
  user?: GenerateTokenPayLoad;
}

export const authenticationValidation = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return responseService.response({
      res,
      statusCode: 401,
      message: "Authorizaation required",
    });
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    return responseService.response({
      res,
      statusCode: 401,
      message: "Authorizaation required",
    });
  }

  try {
    const decoded = jwt.verify(
      token as string,
      config.jwtSecret
    ) as GenerateTokenPayLoad;
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return responseService.response({
      res,
      statusCode: 400,
      message: "Authorization required",
    });
  }
};

export const authorizationValidation =
  (role: "admin" | "student") =>
  (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== role)
      return responseService.response({
        res,
        statusCode: 400,
        message: "Unauthorised Access",
      });

    next();
  };
