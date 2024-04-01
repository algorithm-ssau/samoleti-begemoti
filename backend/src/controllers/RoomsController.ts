import RoomModel from "../models/Rooms";
import { Request, Response } from "express";
import * as functionCRUD from "./utilsControllers";

export const create = async (req: Request, res: Response) => {
    await functionCRUD.funcForCreate(
        req,
        res,
        RoomModel,
        ["category", "price", "bedAmount", "facilities", "number"],
        "Не удалось добавить комнату"
    );
};

export const getAll = async (_: Request, res: Response) => {
    await functionCRUD.funcForGetAll(
        _,
        res,
        RoomModel,
        "Не удалось получить комнаты"
    );
};

export const getOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForGetOne(req, res, RoomModel, [
        "Комната не найдена",
        "Не удалось вернуть комнату",
        "Не удалось получить комнату",
    ]);
};

export const deleteOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForDeleteOne(req, res, RoomModel, [
        "Комната не найдена",
        "Не удалось вернуть комнату",
        "Не удалось получить комнату",
    ]);
};

export const updateOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForUpdateOne(
        req,
        res,
        RoomModel,
        ["category", "price", "bedAmount", "facilities", "number"],
        [
            "Комната не найдена",
            "Не удалось вернуть комнату",
            "Не удалось получить комнату",
        ]
    );
};
