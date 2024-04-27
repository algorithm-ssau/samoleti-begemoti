import express from "express";
import { RoomsController } from "../controllers/index";

export const roomRouter = express.Router();

roomRouter.post("/rooms", RoomsController.create);
roomRouter.get("/rooms", RoomsController.getAll);
roomRouter.get("/rooms/:id", RoomsController.getOne);
roomRouter.delete("/rooms/:id", RoomsController.deleteOne);
roomRouter.patch("/rooms/:id", RoomsController.updateOne);
