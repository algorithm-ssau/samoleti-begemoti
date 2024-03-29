import express from "express";
import { AddressController } from "../controllers/index";

export const addressRouter = express.Router();

addressRouter.post("/addresses", AddressController.create);
addressRouter.get("/addresses", AddressController.getAll);
addressRouter.get("/addresses/:id", AddressController.getOne);
addressRouter.delete("/addresses/:id", AddressController.deleteOne);
addressRouter.patch("/addresses/:id", AddressController.updateOne);
