import { Types } from "mongoose";

export type TDay = "Sat" | "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export type TClassSchedule = {
  days: TDay[];
  startTime: string;
  endTime: string;
  trainer: Types.ObjectId;
  trainees?: Types.ObjectId[];
  traineeCount: number;
};

export type TSchedule = {
  days: TDay[];
  startTime: string;
  endTime: string;
};
