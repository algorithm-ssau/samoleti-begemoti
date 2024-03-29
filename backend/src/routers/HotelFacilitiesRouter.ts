import express from "express";
import { HotelFacilitiesController } from "../controllers/index";

export const hotelFacilityRouter = express.Router();

hotelFacilityRouter.post("/hotelFacilities", HotelFacilitiesController.create);
hotelFacilityRouter.get("/hotelFacilities", HotelFacilitiesController.getAll);
hotelFacilityRouter.get(
    "/hotelFacilities/:id",
    HotelFacilitiesController.getOne
);
hotelFacilityRouter.delete(
    "/hotelFacilities/:id",
    HotelFacilitiesController.deleteOne
);
hotelFacilityRouter.patch(
    "/hotelFacilities/:id",
    HotelFacilitiesController.updateOne
);
