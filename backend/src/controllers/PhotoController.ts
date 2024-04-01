import PhotoModel from "../models/Photo";
import { Request, Response } from "express";
import * as functionCRUD from "./utilsControllers";

export const create = async (req: Request, res: Response) => {
    await functionCRUD.funcForCreate(
        req,
        res,
        PhotoModel,
        ["imageUrl"],
        "Не удалось добавить фото"
    );
};

export const getAll = async (_: Request, res: Response) => {
    await functionCRUD.funcForGetAll(
        _,
        res,
        PhotoModel,
        "Не удалось получить фото"
    );
};

export const getOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForGetOne(req, res, PhotoModel, [
        "Фото не найдено",
        "Не удалось вернуть фото",
        "Не удалось получить фото",
    ]);
};

export const deleteOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForDeleteOne(req, res, PhotoModel, [
        "Фото не найдено",
        "Не удалось вернуть фото",
        "Не удалось получить фото",
    ]);
};

export const updateOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForUpdateOne(
        req,
        res,
        PhotoModel,
        ["imageUrl"],
        [
            "Фото не найдено",
            "Не удалось вернуть фото",
            "Не удалось получить фото",
        ]
    );
};
