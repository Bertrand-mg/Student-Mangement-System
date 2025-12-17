import { Request, Response } from "express";
import { UserInterface } from "../types";
import { generateToken, ResponseService } from "../util";
import { hashPassword, comparePassword } from "../util";
import { UserService } from "../service";

const userService = new UserService();
const responseService = new ResponseService();

export class AuthController {
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await userService.fetchUserByEmail(email);
      if (user?.$isEmpty) {
        if (!(await comparePassword(user.password as string, password))) {
          return responseService.response({
            res,
            statusCode: 401,
            message: "Invalid Credentails",
          });
        }
        const token = generateToken({
          id: user?._id as unknown as string,
          role: user?.role as string,
        });
        return responseService.response({
          res,
          statusCode: 200,
          message: "Login Successful",
          data: token,
        });
      }
      return responseService.response({
        res,
        statusCode: 401,
        message: "Invalid Credentails",
      });
    } catch (error) {
      const { message, stack } = error as Error;
      return responseService.response({
        res,
        statusCode: 500,
        message,
        data: stack,
      });
    }
  };

  register = async (req: Request, res: Response) => {
    try {
      const { fullName, gender, email, role, password, isActive } = req.body;

      const newUser: UserInterface = {
        fullName,
        gender,
        email,
        role,
        password: hashPassword(password),
        isActive,
      };

      const user = await userService.createNewUser(newUser);

      return responseService.response({
        res,
        statusCode: 201,
        message: "User Registered Succesffully",
        data: user,
      });
    } catch (error) {
      const { message, stack } = error as Error;
      return responseService.response({
        res,
        statusCode: 500,
        message,
        data: stack,
      });
    }
  };
}
