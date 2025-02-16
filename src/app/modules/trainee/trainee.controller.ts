
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { TraineeServices } from "./trainee.service";


const getAllUsers = catchAsync(async (req, res) => {

  const result = await TraineeServices.getAllUserFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User are retrieved Successfully",
    data: result,
  });
});

export const TraineeControllers = {
  getAllUsers
};
