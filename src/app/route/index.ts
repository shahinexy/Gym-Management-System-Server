import express from "express";
import { AuthRouter } from "../modules/auth/auth.route";
import { AdminRouter } from "../modules/admin/admin.route";
import { TrainerRouter } from "../modules/trainer/trainer.route";

const router = express.Router();

const moduleRouter = [
  {
    path: "/auth",
    router: AuthRouter,
  },
  {
    path: "/user",
    router: AdminRouter,
  },
  {
    path: "/admin",
    router: AdminRouter,
  },
  {
    path: "/trainer",
    router: TrainerRouter,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.router));

export default router;
