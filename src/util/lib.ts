import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config";

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10) as string;
};

export const comparePassword = async (
  db_password: string,
  password: string
) => {
  return await bcrypt.compare(password, db_password);
};

export interface GenerateTokenPayLoad {
  id: string;
  role: string;
}

export const generateToken = ({ id, role }: GenerateTokenPayLoad) => {
  return jwt.sign(
    {
      id,
      role,
    },
    config.jwtSecret,
    { expiresIn: "1hr" }
  );
};
