import express from "express";
import { HotelBookingController } from "../controllers/index";

export const hotelBookingRouter = express.Router();

hotelBookingRouter
    .post("/hotelBookings", HotelBookingController.create)
    .get("/hotelBookings", HotelBookingController.getAll)
    .get("/hotelBookings/:id", HotelBookingController.getOne)
    .delete("/hotelBookings/:id", HotelBookingController.deleteOne)
    .patch("/hotelBookings/:id", HotelBookingController.updateOne);
