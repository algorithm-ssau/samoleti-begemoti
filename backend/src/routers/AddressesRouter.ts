import express from "express";
import { AddressController } from "../controllers/index";

export const addressRouter = express.Router();

addressRouter
    .post("/addresses", AddressController.create)
    .get("/addresses", AddressController.getAll)
    .get("/addresses/:id", AddressController.getOne)
    .delete("/addresses/:id", AddressController.deleteOne)
    .patch("/addresses/:id", AddressController.updateOne);
