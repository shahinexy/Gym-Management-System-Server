import { z } from "zod";
import { Days } from "./classSchedule.constant";

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  }
);

export const createScheduleValidationSchema = z.object({
  body: z
    .object({
      day: z.enum(Days),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
      trainer: z.string(),
      trainees: z
        .array(z.string(), {
          message: "Invalid trainee ID",
        })
        .optional(),
      traineeCount: z
        .number()
        .min(0, "Trainee count cannot be negative")
        .default(0),
    })
    .refine(
      (body) => {
        // startTime : 10:30  => 1970-01-01T10:30
        //endTime : 12:30  =>  1970-01-01T12:30

        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: "Start time should be before End time !  ",
      }
    ),
});

export const ClassScheduleValidations = {
  createScheduleValidationSchema,
};
