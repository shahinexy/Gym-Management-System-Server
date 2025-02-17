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
  const maxTrainee = 10;
  payload.traineeCount = traineeCount;
  payload.maxTrainees = maxTrainee;
  payload.availableSlots = maxTrainee - traineeCount;

  const result = await ClassScheduleModle.create(payload);
  return result;
};

const getAllClassScheduleFromDB = async () => {
  const result = await ClassScheduleModle.find();
  return result;
};

const getSingleClassScheduleFromDB = async (id: string) => {
  const result = await ClassScheduleModle.findById(id);
  return result;
};

const updateClassSchedule = async (
  id: string,
  payload: Pick<TClassSchedule, "startTime" | "endTime" | "trainer">
) => {
  // check if schedule exists
  const isScheduleExists = await ClassScheduleModle.findById(id);

  if (!isScheduleExists) {
    throw new AppError(status.NOT_FOUND, "Class Schedule not found");
  }
  // check schedule time conflict
  const otherShedules = await ClassScheduleModle.find({
    days: { $in: isScheduleExists.days },
  }).select("days startTime endTime");

  const newSchedule = {
    days: isScheduleExists.days,
    startTime: payload.startTime,
    endTime: payload.endTime,
  };

  if (hasTimeConflict(otherShedules, newSchedule)) {
    throw new AppError(
      status.CONFLICT,
      "Another class is already scheduled during this time slot."
    );
  }

  const result = await ClassScheduleModle.findByIdAndUpdate(id, payload, {
    runValidators: true,
    new: true,
  });

  return result;
};

const assignTraineeWithClassSchedule = async (
  id: string,
  payload: Pick<TClassSchedule, "trainees">
) => {
  // check if schedule exists
  const isScheduleExists = await ClassScheduleModle.findById(id);

  if (!isScheduleExists) {
    throw new AppError(status.NOT_FOUND, "Class Schedule not found");
  }

  const result = await ClassScheduleModle.findByIdAndUpdate(
    id,
    {
      $addToSet: { trainees: { $each: payload.trainees } },
    },
    {
      runValidators: true,
      new: true,
    }
  );

  return result;
};

const removeTraineeFromClassSchedule = async (
  id: string,
  payload: Pick<TClassSchedule, "trainees">
) => {
  // check if schedule exists
  const isScheduleExists = await ClassScheduleModle.findById(id);

  if (!isScheduleExists) {
    throw new AppError(status.NOT_FOUND, "Class Schedule not found");
  }

  const result = await ClassScheduleModle.findByIdAndUpdate(
    id,
    {
      $pull: { trainees: { $in: payload.trainees } },
    },
    {
      runValidators: true,
      new: true,
    }
  );

  return result;
};

const deleteClassScheduleFromDB = async (id: string) => {
  // check if schedule exists
  const isScheduleExists = await ClassScheduleModle.findById(id);

  if (!isScheduleExists) {
    throw new AppError(status.NOT_FOUND, "Class Schedule not found");
  }

  const result = await ClassScheduleModle.findByIdAndDelete(id);
  return result;
};

export const ClassScheduleServices = {
  createClassScheduleIntoDB,
  getAllClassScheduleFromDB,
  getSingleClassScheduleFromDB,
  updateClassSchedule,
  assignTraineeWithClassSchedule,
  removeTraineeFromClassSchedule,
  deleteClassScheduleFromDB,
};
