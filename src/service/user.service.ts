import { UserModel } from "../model";
import { UserInterface } from "../types";

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

  createNewUser = async (user: UserInterface) => {
    const newUser = await UserModel.create({
      ...user,
    });
    await newUser.save();
    return newUser;
  };
}
