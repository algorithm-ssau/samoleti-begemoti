import express from "express";
import { HotelController } from "../controllers/index";
import { adminMiddleware } from "../middleware/AdminAuthMiddleware";

export const hotelRouter = express
    .Router()
    .get("/search/hotel", HotelController.getByPlace)
    .get("/hotels", HotelController.getAll)
    .get("/hotels/:id", HotelController.getOne)
    .use(adminMiddleware)
    .post("/hotels", HotelController.create)
    .delete("/hotels/:id", HotelController.deleteOne)
    .patch("/hotels/:id", HotelController.updateOne)
    .post("/hotels-full", HotelController.createFull);
