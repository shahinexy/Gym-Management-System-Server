import express from "express";
import auth from "../../middleware/auth";
import { BookingScheduleControllers } from "./bookingSchedule.controller";

const router = express.Router();


router.post("/book-schedule", auth('trainee'), BookingScheduleControllers.createBookingSchedule);

router.post("/cancel-schedule", auth('trainee'), BookingScheduleControllers.cancleBookedSchedule);

router.get("/",  BookingScheduleControllers.getAllBookedSchedule);

export const BookingScheuleRouters = router;
