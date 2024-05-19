import express from "express";
import { ReviewController } from "../controllers/index";

export const reviewRouter = express.Router();

reviewRouter.post("/reviews", ReviewController.create);
reviewRouter.get("/reviews", ReviewController.getAll);
reviewRouter.get("/reviews/:id", ReviewController.getOne);
reviewRouter.delete("/reviews/:id", ReviewController.deleteOne);
reviewRouter.patch("/reviews/:id", ReviewController.updateOne);
