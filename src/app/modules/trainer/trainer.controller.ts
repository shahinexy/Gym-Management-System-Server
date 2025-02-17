/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { TrainerServices } from "./trainer.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";

const getAllTrainers = catchAsync(async (req: Request, res: Response) => {
  const result = await TrainerServices.getAllTrainerFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Trainer are retrieved successfully",
    data: result,
  });
});

const getSingleTrainer = catchAsync(async (req: Request, res: Response) => {
  const result = await TrainerServices.getSingleTrainerFromDB(req.params.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Trainer are retrieved successfully",
    data: result,
  });
});

export const TrainerControllers = {
  getAllTrainers,
  getSingleTrainer,
};
