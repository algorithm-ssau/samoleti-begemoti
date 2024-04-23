import express from "express";
import { PhotoController } from "../controllers/index";

export const photoRouter = express.Router();

photoRouter.post("/photos", PhotoController.create);
photoRouter.get("/photos", PhotoController.getAll);
photoRouter.get("/photos/:id", PhotoController.getOne);
photoRouter.delete("/photos/:id", PhotoController.deleteOne);
photoRouter.patch("/photos/:id", PhotoController.updateOne);
