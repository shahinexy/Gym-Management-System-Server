import { USER_ROLE } from "./auth.constant";

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TUserRegister = {
  name: TUserName;
  age: number;
  gender: "male" | "female";
  image?: string;
  role: "admin" | "trainer" | "trainee";
  email: string;
  password: string;
  isBlocked: boolean;
};

export type TLoginUser = {
  email: string;
  password: string;
};

export type TUserRole = keyof typeof USER_ROLE;
