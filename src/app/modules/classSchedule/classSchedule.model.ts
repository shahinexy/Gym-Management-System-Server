import { Schema, model } from "mongoose";
import { TClassSchedule } from "./classSchedule.interface";
import { Days } from "./classSchedule.constant";

const classScheduleSchema = new Schema<TClassSchedule>(
  {
    day: {
      type: String,
      enum: Days,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: "Trainer",
      required: true,
    },
    trainees: [
      {
        type: Schema.Types.ObjectId,
        ref: "Trainee",
      },
    ],
    traineeCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, 
  }
);


export const ClassScheduleModle = model<TClassSchedule>("ClassSchedule", classScheduleSchema);
