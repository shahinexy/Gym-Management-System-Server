/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TBookingSchedule } from "./bookingSchedule.interface";
import { BookingScheduleModle } from "./bookingSchedule.model";
import { ClassScheduleModle } from "../classSchedule/classSchedule.model";
import AppError from "../../error/AppError";
import status from "http-status";

const createBookingScheduleIntoDB = async (
  payload: TBookingSchedule,
  userId: string
) => {
  // check is schedule exists
  const isScheduleExists = await ClassScheduleModle.findById(
    payload.classSchedule
  );

  if (!isScheduleExists) {
    throw new AppError(status.NOT_FOUND, "Class Schedue not found");
  }

  // check is user already booked
  const selectedScheduleId = isScheduleExists

  const isUserAlreadyBooked = await BookingScheduleModle.findOne({
    classSchedule: selectedScheduleId,
    trainee: userId,
  });

  if (isUserAlreadyBooked) {
    throw new AppError(
      status.BAD_REQUEST,
      "You have already booked this schedule"
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const assignTraineeIntoSchedule =
      await ClassScheduleModle.findByIdAndUpdate(
        payload.classSchedule,
        {
          $addToSet: { trainees: userId },
        },
        { session }
      );

      if (!assignTraineeIntoSchedule) {
        throw new AppError(status.BAD_REQUEST, "Failed to assign user to schedule");
      }

    payload.trainee = new mongoose.Types.ObjectId(userId);

    const bookSchedule = await BookingScheduleModle.create([payload], {
      session,
    });

    if (!bookSchedule || bookSchedule.length === 0) {
      throw new AppError(400, "Failed to create booking schedule");
    }

    await session.commitTransaction();
    await session.endSession();

    return bookSchedule;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(error);
  }
};

const cancleBookedScheduleFromDB = async (
  payload: TBookingSchedule,
  userId: string
) => {
  // check is schedule exists
  const isScheduleExists = await ClassScheduleModle.findById(
    payload.classSchedule
  );

  if (!isScheduleExists) {
    throw new AppError(status.NOT_FOUND, "Class Schedue not found");
  }

  // check is user booked the shedule
  const selectedScheduleId = isScheduleExists._id

  const isUserBookedSchedule = await BookingScheduleModle.findOne({
    classSchedule: selectedScheduleId,
    trainee: userId,
  });

  if (!isUserBookedSchedule) {
    throw new AppError(
      status.BAD_REQUEST,
      "You did not booked this schedule"
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const cancelTraineeFromSchedule =
      await ClassScheduleModle.findByIdAndUpdate(
        selectedScheduleId,
        {
          $pull: { trainees: userId },
        },
        { session }
      );

      if (!cancelTraineeFromSchedule) {
        throw new AppError(status.BAD_REQUEST, "Failed to cancel the schedule");
      }

    payload.trainee = new mongoose.Types.ObjectId(userId);

    // Cancel booking entry
    const cancelBookedSchedule = await BookingScheduleModle.findOneAndDelete(
      { classSchedule: selectedScheduleId, trainee: userId },
      { session }
    );

    if (!cancelBookedSchedule) {
      throw new AppError(status.BAD_REQUEST, "Failed to cancel the booking");
    }

    await session.commitTransaction();
    await session.endSession();

    return cancelBookedSchedule;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(error);
  }
};

const getAllBookedScheduleFromDB = async () => {
  const result = await BookingScheduleModle.find();
  return result;
};

const myBookedScheduls = async (userId: string)=>{
  const result = await BookingScheduleModle.find({trainee: userId})
  return result
}
export const BookingScheduleServices = {
  createBookingScheduleIntoDB,
  getAllBookedScheduleFromDB,
  cancleBookedScheduleFromDB,
  myBookedScheduls
};
