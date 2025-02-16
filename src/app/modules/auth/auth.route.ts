import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidations } from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(AuthValidations.userRegisterValidationSchema),
  AuthController.userRegister
);

router.post(
  "/login",
  validateRequest(AuthValidations.userLoginValidationSchema),
  AuthController.loginUser
);

export const AuthRouter = router;
