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

router.get("/", ClassScheduleControllers.getAllClassSchedule);

router.get("/:id", ClassScheduleControllers.getSingleClassSchedule);

router.patch(
  "/:id",
  validateRequest(ClassScheduleValidations.updateScheduleValidationSchema),
  ClassScheduleControllers.updateClassSchedule
);

router.put(
  "/:id/assign-trainee",
  validateRequest(ClassScheduleValidations.assignTraineeValidationSchema),
  ClassScheduleControllers.assignTraineeWithClassSchedule
);

router.delete(
  "/:id/remove-trainee",
  ClassScheduleControllers.removeTraineeFromClassSchedule
);

router.delete("/:id", ClassScheduleControllers.deleteClassSchedule);

export const ClassScheduleRouters = router;
