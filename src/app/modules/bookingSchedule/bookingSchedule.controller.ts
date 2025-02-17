import sendResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { BookingScheduleServices } from "./bookingSchedule.service";
import { JwtPayload } from "jsonwebtoken";

const createBookingSchedule = catchAsync(async (req, res) => {
  const { userId } = req.user as JwtPayload;

  const result = await BookingScheduleServices.createBookingScheduleIntoDB(
    req.body,
    userId
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedule booked successfully",
    data: result,
  });
});

const cancleBookedSchedule = catchAsync(async (req, res) => {
  const { userId } = req.user as JwtPayload;

  const result = await BookingScheduleServices.cancleBookedScheduleFromDB(
    req.body,
    userId
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Cancel booked schedule successfully",
    data: result,
  });
});

const getAllBookedSchedule = catchAsync(async (req, res) => {
  const result = await BookingScheduleServices.getAllBookedScheduleFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Schedule booked successfully",
    data: result,
  });
});

export const BookingScheduleControllers = {
  createBookingSchedule,
  cancleBookedSchedule,
  getAllBookedSchedule,
};
