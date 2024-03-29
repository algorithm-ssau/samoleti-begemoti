import express from "express";
import { HotelController } from "../controllers/index";

export const hotelRouter = express.Router();

hotelRouter.get("/search/hotel", HotelController.getByPlace);
hotelRouter.get("/hotels", HotelController.getAll);
hotelRouter.get("/hotels/:id", HotelController.getOne);
hotelRouter.post("/hotels", HotelController.create);
hotelRouter.delete("/hotels/:id", HotelController.deleteOne);
hotelRouter.patch("/hotels/:id", HotelController.updateOne);
