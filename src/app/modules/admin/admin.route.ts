import express from "express";
import auth from "../../middleware/auth";
import { AdminControllers } from "./admin.controller";

const router = express.Router();


router.get("/users", auth('admin', 'trainee'), AdminControllers.getAllUsers);

export const AdminRouters = router;
