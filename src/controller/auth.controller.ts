import { Request, Response } from "express";
import { CreateUserInterface, UserInterface, UserResponse } from "../types";
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
          message: "Login Successfully",
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
      const { fullName, gender, email, password, isActive } = req.body;
      let { role } = req.body;

      if (role == undefined) role == "student";

      const newUser: CreateUserInterface = {
        fullName,
        gender,
        email,
        role,
        password: hashPassword(password),
        isActive,
      };

      const user = (await userService.createNewUser(newUser)) as UserResponse;

      return responseService.response<UserResponse>({
        res,
        statusCode: 201,
        message: "User Registered Successfully",
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
