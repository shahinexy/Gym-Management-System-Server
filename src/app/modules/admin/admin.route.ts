import express from "express";
import auth from "../../middleware/auth";
import { AdminControllers } from "./admin.controller";

const router = express.Router();


router.get("/users", auth('admin'), AdminControllers.getAllUsers);
router.get("/users/:id", auth('admin'), AdminControllers.getSingleUser);

export const AdminRouters = router;
