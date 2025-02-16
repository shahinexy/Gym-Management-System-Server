import { Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TTrainer = {
  name: TUserName;
  age: number;
  gender: "male" | "female";
  image?: string,
  role: "admin" | "trainer" | "trainee";
  email: string;
  password: string;
  assignedSchedules?: [Types.ObjectId];
  isBlocked: boolean;
};
