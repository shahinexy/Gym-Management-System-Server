import express from "express";
import { AuthRouter } from "../modules/auth/auth.route";
import { TrainerRouter } from "../modules/trainer/trainer.route";
import { UserRouter } from "../modules/user/user.route";
import { AdminRouter } from "../modules/admin/admin.route";
import { TraineeRouter } from "../modules/trainee/trainee.route";

const router = express.Router();

const moduleRouter = [
  {
    path: "/auth",
    router: AuthRouter,
  },
  {
    path: "/user",
    router: UserRouter,
  },
  {
    path: "/admin",
    router: AdminRouter,
  },
  {
    path: "/trainer",
    router: TrainerRouter,
  },
  {
    path: "/trainee",
    router: TraineeRouter,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.router));

export default router;
