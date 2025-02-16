import status from "http-status";
import AppError from "../../error/AppError";
import { TLoginUser, TUserRegister } from "./auth.interface";
import { UserModle } from "./auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

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
  const isUserBlocked = isUserExists?.isBlocked;

  if (isUserBlocked) {
    throw new AppError(status.FORBIDDEN, "This user is blocked");
  }

  // check if password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExists.password
  );

  if (!isPasswordMatched) {
    throw new AppError(status.BAD_REQUEST, "Incorrect password");
  }

  // create access token
  const jwtPayload = {
    userId: isUserExists._id,
    userRole: isUserExists.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "1d",
  });

  return accessToken;
};

export const AuthServices = {
  userRegisterIntoDB,
  loginUser,
};
