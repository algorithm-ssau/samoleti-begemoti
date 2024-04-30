import express from "express";
import { ReviewController } from "../controllers/index";

export const reviewRouter = express.Router();

reviewRouter.post("/hotel/:id/reviews", ReviewController.create);
reviewRouter.get("/hotel/:id/reviews", ReviewController.getAll);
reviewRouter.get("/hotel/:id/reviews", ReviewController.getOne);
reviewRouter.delete(
    "/hotel/:id/review/delete",
    ReviewController.deleteOne
);
reviewRouter.patch(
    "/hotel/:id/review",
    ReviewController.updateOne
);