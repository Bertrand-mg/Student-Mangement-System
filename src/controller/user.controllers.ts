import { Request, Response } from "express";
import { UserInterface } from "../types";
import { UserService } from "../service";
import { AuthRequest } from "../middleware";

const userService = new UserService();

export class UserController {
  getAllUsers = async (req: Request, res: Response) => {
    try {
      res.status(200).json({
        message: "User Retrieved Succesffully",
        data: await userService.fetchAllUsers(),
      });
    } catch (error) {}
  };

  getUserProfile = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.id as string;
      res.status(200).json({
        message: "Retrieved User Profile",
        data: await userService.fetchUserById(userId),
      });
    } catch (error) {}
  };
}
