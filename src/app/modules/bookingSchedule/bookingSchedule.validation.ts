import { z } from "zod";

const createBookingScheduleValidationSchema = z.object({
  body: z.object({
    classSchedule: z.string({ required_error: "Class Schedule id is required" }),
  }),
});

export const BookingScheduleValidations = {
  createBookingScheduleValidationSchema,
};
