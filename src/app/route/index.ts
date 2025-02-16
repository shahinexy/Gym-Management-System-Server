import express from "express";
import { AuthRouter } from "../modules/auth/auth.route";

const router = express.Router();

const moduleRouter = [
  {
    path: "/auth",
    router: AuthRouter,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.router));

export default router;
