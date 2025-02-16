
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
  const {password, ...restData} = req.body
  const result = await userServices.createAdminIntoDB(password, restData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Trainer created successfully",
    data: result,
  });
})

const createTrainer = catchAsync(async (req, res) => {
  const {password, ...restData} = req.body
  const result = await userServices.createTrainerIntoDB(password, restData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Trainer created successfully",
    data: result,
  });
})

const createTrainee = catchAsync(async (req, res) => {
  const {password, ...restData} = req.body
  const result = await userServices.createTraineeIntoDB(password, restData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Trainer created successfully",
    data: result,
  });
})



export const UserControllers = {
  createAdmin,
  createTrainer,
  createTrainee
};
