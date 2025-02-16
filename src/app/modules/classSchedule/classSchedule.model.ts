import { Schema, model } from "mongoose";
import { TClassSchedule } from "./classSchedule.interface";

const classScheduleSchema = new Schema<TClassSchedule>(
  {
    date: {
      type: Date,
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
