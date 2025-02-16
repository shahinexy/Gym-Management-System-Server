/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/AppError";
import status from "http-status";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModle } from "../modules/auth/auth.model";

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(status.UNAUTHORIZED, "You are unauthorize");
    }

    // check token is valid
    let decoded;

    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(status.UNAUTHORIZED, "Unauthorized");
    }

    console.log(decoded);
    const { userId, userRole, iat } = decoded;

    // check if user exists
    const isUserExists = await UserModle.findById(userId);

    if (!isUserExists) {
      throw new AppError(status.NOT_FOUND, "This user is not found");
    }

    // check if the use is blocked
    if (isUserExists.isBlocked) {
      throw new AppError(status.UNAUTHORIZED, "This user is Bolocked");
    }

    next();
  });
};

export default auth;
