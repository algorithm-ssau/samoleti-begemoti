import express from "express";
import { RoomCategoryController } from "../controllers/index";

export const roomCategoryRouter = express.Router();

roomCategoryRouter.post("/roomCategories", RoomCategoryController.create);
roomCategoryRouter.get("/roomCategories", RoomCategoryController.getAll);
roomCategoryRouter.get("/roomCategories/:id", RoomCategoryController.getOne);
roomCategoryRouter.delete(
    "/roomCategories/:id",
    RoomCategoryController.deleteOne
);
roomCategoryRouter.patch(
    "/roomCategories/:id",
    RoomCategoryController.updateOne
);
