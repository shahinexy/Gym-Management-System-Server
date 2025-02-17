import status from "http-status";
import AppError from "../../error/AppError";
import { TClassSchedule } from "./classSchedule.interface";
import { ClassScheduleModle } from "./classSchedule.model";
import { TrainerModle } from "../trainer/trainer.model";
import moment from "moment";
import { hasTimeConflict } from "./classSchedule.utils";

const createClassScheduleIntoDB = async (payload: TClassSchedule) => {
  // check if Class schedule limit reached
  for (const day of payload.days) {
    const scheduleCount = await ClassScheduleModle.countDocuments({
      days: day,
    });

    if (scheduleCount >= 5) {
      throw new AppError(
        status.FORBIDDEN,
        `Class schedule limit reached for ${day}. Maximum of 5 schedules allowed per day.`
      );
    }
  }

  // check class duration
  const startMoment = moment(payload.startTime, "HH:mm");
  const endMoment = moment(payload.endTime, "HH:mm");

  const classDuration = moment.duration(endMoment.diff(startMoment)).asHours();

  if (classDuration !== 2) {
    throw new AppError(
      status.BAD_REQUEST,
      "Each class must be exactly 2 hours long."
    );
  }

  // chcck if trainee limit reached
  const traineeCount = payload.trainees?.length || 0;

  if (traineeCount > 10) {
    throw new AppError(
      status.FORBIDDEN,
      `Schedule trainee limit reached. Maximum of 10 trainee allowed per Schedule.`
    );
  }

  // check if trainer exists
  const isTrainerExists = await TrainerModle.findById(payload.trainer);

  if (!isTrainerExists) {
    throw new AppError(status.NOT_FOUND, "Trainer dose not exists");
  }

  // check schedule time conflict
  const otherShedules = await ClassScheduleModle.find({
    days: { $in: payload.days },
  }).select("days startTime endTime");

  const newSchedule = {
    days: payload.days,
    startTime: payload.startTime,
    endTime: payload.endTime,
  };

  if (hasTimeConflict(otherShedules, newSchedule)) {
    throw new AppError(
      status.CONFLICT,
      "Another class is already scheduled during this time slot."
    );
  }

  // assign trainee count
  payload.traineeCount = traineeCount;

  const result = await ClassScheduleModle.create(payload);
  return result;
};

const getAllClassScheduleFromDB = async () => {
  const result = await ClassScheduleModle.find();
  return result;
};

export const ClassScheduleServices = {
  createClassScheduleIntoDB,
  getAllClassScheduleFromDB,
};
