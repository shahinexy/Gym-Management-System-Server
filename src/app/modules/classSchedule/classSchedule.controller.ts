
import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { ClassScheduleServices } from "./classSchedule.service";


const createClassSchedule = catchAsync(async (req, res) => {

  const result = await ClassScheduleServices.createClassScheduleIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User are retrieved Successfully",
    data: result,
  });
});

export const ClassScheduleControllers = {
  createClassSchedule
};
