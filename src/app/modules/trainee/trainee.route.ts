import express from "express";
import auth from "../../middleware/auth";
import { TraineeControllers } from "./trainee.controller";

const router = express.Router();


router.get("/users", auth('admin', 'trainee'), TraineeControllers.getAllUsers);

export const TraineeRouters = router;
