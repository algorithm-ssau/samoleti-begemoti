import express from "express";
import { AuthController } from "../controllers/index";

export const authRouter = express.Router();

authRouter
    .post("/auth/register", AuthController.register)
    .post("/auth/login", AuthController.login);