import { Schema, model } from "mongoose";
import { TBookingSchedule } from "./bookingSchedule.interface";

const bookingScheduleSchema = new Schema<TBookingSchedule>(
  {
    classSchedule: {
      type: Schema.Types.ObjectId,
      ref: "Class-Schedule",
      required: true,
    },
    trainee: {
      type: Schema.Types.ObjectId,
      ref: "Trainee",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);


export const BookingScheduleModle = model<TBookingSchedule>("Booking-Schedule", bookingScheduleSchema);
