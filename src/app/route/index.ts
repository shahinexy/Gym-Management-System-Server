import express from "express";
import { AuthRouters } from "../modules/auth/auth.route";
import { TrainerRouters } from "../modules/trainer/trainer.route";
import { UserRouters } from "../modules/user/user.route";
import { AdminRouters } from "../modules/admin/admin.route";
import { TraineeRouters } from "../modules/trainee/trainee.route";
import { ClassScheduleRouters } from "../modules/classSchedule/classSchedule.route";

const router = express.Router();

const moduleRouter = [
  {
    path: "/auth",
    router: AuthRouters,
  },
  {
    path: "/users",
    router: UserRouters,
  },
  {
    path: "/admins",
    router: AdminRouters,
  },
  {
    path: "/trainers",
    router: TrainerRouters,
  },
  {
    path: "/trainees",
    router: TraineeRouters,
  },
  {
    path: "/class-schedules",
    router: ClassScheduleRouters,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.router));

export default router;
