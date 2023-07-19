import { Router } from "express";
import AuthController from "./auth.controller.js";

const authRoutes = Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/signup", AuthController.signUp);
authRoutes.post("/refresh-token", AuthController.refreshToken);

export default authRoutes;
