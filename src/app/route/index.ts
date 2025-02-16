import express from "express";
import { AuthRouter } from "../modules/auth/auth.route";
import { AdminRouter } from "../modules/admin/admin.route";

const router = express.Router();

const moduleRouter = [
  {
    path: "/auth",
    router: AuthRouter,
  },
  {
    path: "/admin",
    router: AdminRouter,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.router));

export default router;
