import express from "express";
import { ProfileController } from "../controllers";
import { authMiddleware } from "../middleware/AuthMiddleware";

export const profileRouter = express
    .Router()
    .use(authMiddleware)
    .post("/changePassword", ProfileController.updatePassword)
    .get("/info", ProfileController.info)
    .post("/info", ProfileController.updateInfo);
