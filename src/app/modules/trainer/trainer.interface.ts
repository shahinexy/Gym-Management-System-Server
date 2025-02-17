import { Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TTrainer = {
  name: TUserName;
  user: Types.ObjectId;
  age: number;
  gender: "male" | "female";
  image?: string;
  role: "admin" | "trainer" | "trainee";
  email: string;
  isBlocked: boolean;
};
