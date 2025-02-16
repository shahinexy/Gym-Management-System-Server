import status from "http-status";
import AppError from "../../error/AppError";
import { TLoginUser, TUserRegister } from "./auth.interface";
import { UserModle } from "./auth.model";

const userRegisterIntoDB = async (payload: TUserRegister) => {
  // check if user exists
  const isUserExists = await UserModle.findOne({ email: payload.email });

  if (isUserExists) {
    throw new AppError(status.BAD_REQUEST, "User already exists");
  }

  const result = await UserModle.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // check if user exists
  const isUserExists = await UserModle.findOne({ email: payload.email });

  if (!isUserExists) {
    throw new AppError(status.NOT_FOUND, "User not found");
  }

  // check if user is blocked
  const isUserBlocked = isUserExists?.isBlocked

  if (isUserBlocked) {
    throw new AppError(status.BAD_REQUEST, "This user is blocked");
  }

};

export const AuthServices = {
  userRegisterIntoDB,
  loginUser,
};
