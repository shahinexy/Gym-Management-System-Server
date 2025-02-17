import express from "express";
import { ClassScheduleControllers } from "./classSchedule.controller";
import validateRequest from "../../middleware/validateRequest";
import { ClassScheduleValidations } from "./classSchedule.validation";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/create-class-schedule",
  auth("admin"),
  validateRequest(ClassScheduleValidations.createScheduleValidationSchema),
  ClassScheduleControllers.createClassSchedule
);

router.get("/", auth("admin"), ClassScheduleControllers.getAllClassSchedule);

router.get(
  "/my-class-schedule",
  auth("trainer"),
  ClassScheduleControllers.getMyClassSchedule
);

router.get("/:id", ClassScheduleControllers.getSingleClassSchedule);

router.patch(
  "/:id",
  auth("admin"),
  validateRequest(ClassScheduleValidations.updateScheduleValidationSchema),
  ClassScheduleControllers.updateClassSchedule
);

router.put(
  "/:id/assign-trainee",
  auth("admin"),
  validateRequest(ClassScheduleValidations.assignTraineeValidationSchema),
  ClassScheduleControllers.assignTraineeWithClassSchedule
);

router.delete(
  "/:id/remove-trainee",
  auth("admin"),
  ClassScheduleControllers.removeTraineeFromClassSchedule
);

router.delete(
  "/:id",
  auth("admin"),
  ClassScheduleControllers.deleteClassSchedule
);


export const ClassScheduleRouters = router;
