/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { DemoService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";

const createTrainer = async (req: Request, res: Response) => {
  const result = await DemoService.createTrainerInDB(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Demo created successfully",
    data: result,
  });
};



export const DemoController = {
  createTrainer,
};
