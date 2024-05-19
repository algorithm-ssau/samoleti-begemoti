import express from "express";
import { UserController } from "../controllers/index";

export const userRouter = express.Router();

userRouter
    .post("/users", UserController.create)
    .get("/users", UserController.getAll)
    .get("/users/:id", UserController.getOne)
    .delete("/users/:id", UserController.deleteOne)
    .patch("/users/:id", UserController.updateOne);