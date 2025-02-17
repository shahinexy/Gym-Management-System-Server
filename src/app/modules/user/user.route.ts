import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middleware/validateRequest";
import { AdminValidations } from "../admin/admin.validation";
import { TrainerValidationSchemas } from "../trainer/trainer.validation";
import { TraineeValidations } from "../trainee/trainee.validation";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin
);

router.post(
  "/create-trainer",
  validateRequest(TrainerValidationSchemas.createTrainerValidationSchema),
  UserControllers.createTrainer
);

router.post(
  "/create-trainee",
  validateRequest(TraineeValidations.createTraineeValidationSchema),
  UserControllers.createTrainee
);

export const UserRouters = router;
