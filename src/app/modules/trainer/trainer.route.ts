import express from "express";
import { TrainerControllers } from "./trainer.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/", auth('admin'), TrainerControllers.getAllTrainers);

router.get("/:id", auth('admin'), TrainerControllers.getSingleTrainer);

export const TrainerRouters = router;
