import RoomCategoryModel from "../models/RoomCategory";
import { Request, Response } from "express";
import * as functionCRUD from "./utilsControllers";

export const create = async (req: Request, res: Response) => {
    await functionCRUD.funcForCreate(
        req,
        res,
        RoomCategoryModel,
        ["name"],
        "Не удалось добавить категорию комнаты"
    );
};

export const getAll = async (_: Request, res: Response) => {
    await functionCRUD.funcForGetAll(
        _,
        res,
        RoomCategoryModel,
        "Не удалось получить категорию комнаты"
    );
};

export const getOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForGetOne(req, res, RoomCategoryModel, [
        "Категория комнаты не найдена",
        "Не удалось вернуть категорию комнаты",
        "Не удалось получить категорию комнаты",
    ]);
};

export const deleteOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForDeleteOne(req, res, RoomCategoryModel, [
        "Категория комнаты не найдена",
        "Не удалось вернуть категорию комнаты",
        "Не удалось получить категорию комнаты",
    ]);
};

export const updateOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForUpdateOne(
        req,
        res,
        RoomCategoryModel,
        ["name"],
        [
            "Категория комнаты не найдена",
            "Не удалось вернуть категорию комнаты",
            "Не удалось получить категорию комнаты",
        ]
    );
};
