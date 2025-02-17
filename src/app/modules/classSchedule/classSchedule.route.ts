import express from "express";
import { ClassScheduleControllers } from "./classSchedule.controller";
import validateRequest from "../../middleware/validateRequest";
import { ClassScheduleValidations } from "./classSchedule.validation";

const router = express.Router();

router.post(
  "/create-class-schedule",
  validateRequest(ClassScheduleValidations.createScheduleValidationSchema),
  ClassScheduleControllers.createClassSchedule
);

router.get('/', ClassScheduleControllers.getAllClassSchedule)

export const ClassScheduleRouters = router;
