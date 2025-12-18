export interface UserInterface {
  _id: Object;
  fullName: string;
  gender: "male" | "female" | "other";
  email: string;
  role: "admin" | "student";
  password: string;
  isActive: boolean;
}

export type CreateUserInterface = Pick<
  UserInterface,
  "fullName" | "gender" | "email" | "role" | "password" | "isActive"
>;

export type LoginInterface = Pick<UserInterface, "email" | "password">;

export type UserResponse = Pick<
  UserInterface,
  "_id" | "fullName" | "gender" | "email" | "role" | "isActive"
>;
