import { Router } from "express";
import { loginController, logoutController } from "../controllers/auth.controller";
import { loginRateLimiter } from "../middlewares/rateLimit.middleware";
import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/api/auth/login", loginController);
authRouter.post("/api/auth/logout", logoutController);
authRouter.get("/api/auth/me", authMiddleware, userController);

export default authRouter;
