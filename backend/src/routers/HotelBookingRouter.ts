import express from "express";
import { HotelBookingController } from "../controllers/index";

export const hotelBookingRouter = express.Router();

hotelBookingRouter
    .post("/users", HotelBookingController.create)
    .get("/users", HotelBookingController.getAll)
    .get("/users/:id", HotelBookingController.getOne)
    .delete("/users/:id", HotelBookingController.deleteOne)
    .patch("/users/:id", HotelBookingController.updateOne);