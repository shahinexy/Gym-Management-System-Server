import express from "express";
import { AdminController } from "./admin.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/users", auth('admin', 'trainee'), AdminController.getAllUsers);

export const AdminRouter = router;
