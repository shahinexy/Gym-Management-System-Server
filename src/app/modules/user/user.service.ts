/* eslint-disable @typescript-eslint/no-explicit-any */
import status from "http-status";
import AppError from "../../error/AppError";
import { TTrainer } from "../trainer/trainer.interface";
import { TrainerModle } from "../trainer/trainer.model";
import { TUser } from "./user.interface";
import { UserModle } from "./user.model";
import mongoose from "mongoose";
import { AdminModle } from "../admin/admin.model";
import { TAdmin } from "../admin/admin.interface";
import { TTrainee } from "../trainee/trainee.interface";
import { TraineeModle } from "../trainee/trainee.model";

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  const isUserExists = await AdminModle.findOne({ email: payload.email });

  if (isUserExists) {
    throw new AppError(status.BAD_REQUEST, "User already exists");
  }

  const userData: Partial<TUser> = {};

  userData.name = `${payload.name.firstName} ${payload.name.middleName} ${payload.name.lastName}`;
  userData.email = payload.email;
  userData.password = password;
  userData.role = "admin";

  // transaction & rollback
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create user
    const newUser = await UserModle.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, "Faild to create user");
    }

    // set trainer user id
    payload.user = newUser[0]._id;
    // create trainer
    const newAdmin = await AdminModle.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(400, "Faild to create trainer");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(error);
  }
};

const createTrainerIntoDB = async (password: string, payload: TTrainer) => {
  const isUserExists = await TrainerModle.findOne({ email: payload.email });

  if (isUserExists) {
    throw new AppError(status.BAD_REQUEST, "User already exists");
  }

  const userData: Partial<TUser> = {};

  userData.name = `${payload.name.firstName} ${payload.name.middleName} ${payload.name.lastName}`;
  userData.email = payload.email;
  userData.password = password;
  userData.role = "trainer";

  // transaction & rollback
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create user
    const newUser = await UserModle.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, "Faild to create user");
    }

    // set trainer user id
    payload.user = newUser[0]._id;
    // create trainer
    const newTrainer = await TrainerModle.create([payload], { session });

    if (!newTrainer.length) {
      throw new AppError(400, "Faild to create trainer");
    }

    await session.commitTransaction();
    await session.endSession();

    return newTrainer;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(error);
  }
};

const createTraineeIntoDB = async (password: string, payload: TTrainee) => {
  const isUserExists = await TraineeModle.findOne({ email: payload.email });

  if (isUserExists) {
    throw new AppError(status.BAD_REQUEST, "User already exists");
  }

  const userData: Partial<TUser> = {};

  userData.name = `${payload.name.firstName} ${payload.name.middleName} ${payload.name.lastName}`;
  userData.email = payload.email;
  userData.password = password;
  userData.role = "trainee";

  // transaction & rollback
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // create user
    const newUser = await UserModle.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, "Faild to create user");
    }

    // set trainer user id
    payload.user = newUser[0]._id;
    // create trainer
    const newTrainee = await TraineeModle.create([payload], { session });

    if (!newTrainee.length) {
      throw new AppError(400, "Faild to create trainer");
    }

    await session.commitTransaction();
    await session.endSession();

    return newTrainee;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(error);
  }
};

export const userServices = {
  createAdminIntoDB,
  createTrainerIntoDB,
  createTraineeIntoDB,
};
