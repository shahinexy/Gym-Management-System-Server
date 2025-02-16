
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AdminServices } from "./classSchedule.service";


const getAllUsers = catchAsync(async (req, res) => {

  const result = await AdminServices.getAllUserFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User are retrieved Successfully",
    data: result,
  });
});

export const AdminControllers = {
  getAllUsers
};
