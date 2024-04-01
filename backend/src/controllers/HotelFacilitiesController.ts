import HotelFacilityModel from "../models/HotelFacilities";
import { Request, Response } from "express";
import * as functionCRUD from "./utilsControllers";

export const create = async (req: Request, res: Response) => {
    await functionCRUD.funcForCreate(
        req,
        res,
        HotelFacilityModel,
        ["name"],
        "Не удалось добавить услугу отеля"
    );
};

export const getAll = async (_: Request, res: Response) => {
    await functionCRUD.funcForGetAll(
        _,
        res,
        HotelFacilityModel,
        "Не удалось получить услугу отеля"
    );
};

export const getOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForGetOne(req, res, HotelFacilityModel, [
        "Услуга не найдена",
        "Не удалось вернуть услуги",
        "Не удалось получить услуги отеля",
    ]);
};

export const deleteOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForDeleteOne(req, res, HotelFacilityModel, [
        "Услуга не найдена",
        "Не удалось вернуть услуги",
        "Не удалось получить услуги отеля",
    ]);
};

export const updateOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForUpdateOne(
        req,
        res,
        HotelFacilityModel,
        ["name"],
        [
            "Услуга не найдена",
            "Не удалось вернуть услуги",
            "Не удалось получить услуги отеля",
        ]
    );
};
