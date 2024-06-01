import express from "express";
import {
    HotelBookingController,
    ProfileController,
} from "../controllers/index";
import { authMiddleware } from "../middleware/AuthMiddleware";

export const hotelBookingRouter = express.Router();

hotelBookingRouter
    .use(authMiddleware)
    .post("/new", ProfileController.booking)
    .post("/hotelBookings", HotelBookingController.create)
    .get("/hotelBookings", HotelBookingController.getAll)
    .get("/hotelBookings/:id", HotelBookingController.getOne)
    .delete("/hotelBookings/:id", HotelBookingController.deleteOne)
    .patch("/hotelBookings/:id", HotelBookingController.updateOne);
