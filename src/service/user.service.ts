import { UserModel } from "../model";
import { CreateUserInterface, UserInterface } from "../types";

export class UserService {
  fetchAllUsers = async () => {
    return await UserModel.find();
  };

  fetchUserById = async (id: string) => {
    return await UserModel.findById(id);
  };

  fetchUserByEmail = async (email: string) => {
    return await UserModel.findOne({ email });
  };

  createNewUser = async (user: CreateUserInterface) => {
    const newUser = await UserModel.create({
      ...user,
    });
    await newUser.save();
    return newUser;
  };
}
