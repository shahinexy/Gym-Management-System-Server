import { Types } from "mongoose";

export type TDays = 'Sat' | 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';

export type TClassSchedule = {
  day: TDays;
  startTime: string;
  endTime: string;
  trainer: Types.ObjectId;
  trainees?: Types.ObjectId[];
  traineeCount: number;
};
