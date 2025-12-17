import { generateToken } from "../util";

export class AuthService {
  loginService = (id: string, role: string) => {
    return generateToken({ id, role });
  };
}
