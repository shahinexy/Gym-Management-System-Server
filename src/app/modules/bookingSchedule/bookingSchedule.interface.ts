import { Types } from "mongoose";

export type TBookingSchedule = {
  classSchedule: Types.ObjectId;
  trainee?: Types.ObjectId;
};
