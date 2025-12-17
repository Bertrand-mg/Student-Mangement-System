export interface UserInterface {
  fullName: string;
  gender: "male" | "female" | "other";
  email: string;
  role: "admin" | "student";
  password: string;
  isActive: boolean;
}
