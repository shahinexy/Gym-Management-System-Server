import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { ClassScheduleServices } from "./classSchedule.service";
import { JwtPayload } from "jsonwebtoken";

const createClassSchedule = catchAsync(async (req, res) => {
  const result = await ClassScheduleServices.createClassScheduleIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Class Schedule created successfully",
    data: result,
  });
});

const getAllClassSchedule = catchAsync(async (req, res) => {
  const result = await ClassScheduleServices.getAllClassScheduleFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Class Schedule are retrieved successfully",
    data: result,
  });
});

const getSingleClassSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ClassScheduleServices.getSingleClassScheduleFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Class Schedule retrieved successfully",
    data: result,
  });
});

const updateClassSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ClassScheduleServices.updateClassSchedule(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Class Shedule updated successfully",
    data: result,
  });
});

const assignTraineeWithClassSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ClassScheduleServices.assignTraineeWithClassSchedule(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Assign trainee successfully",
    data: result,
  });
});

const removeTraineeFromClassSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ClassScheduleServices.removeTraineeFromClassSchedule(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Remove trainee successfully",
    data: result,
  });
});

const deleteClassSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ClassScheduleServices.deleteClassScheduleFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Class Schedule deleted successfully",
    data: result,
  });
});

const getMyClassSchedule = catchAsync(async (req, res) => {
  const { userId } = req.user as JwtPayload;
  const result = await ClassScheduleServices.getMyClassSchedule(userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "My Class Schedule retrieved successfully",
    data: result,
  });
});

export const ClassScheduleControllers = {
  createClassSchedule,
  getAllClassSchedule,
  getSingleClassSchedule,
  updateClassSchedule,
  assignTraineeWithClassSchedule,
  removeTraineeFromClassSchedule,
  deleteClassSchedule,
  getMyClassSchedule
};
