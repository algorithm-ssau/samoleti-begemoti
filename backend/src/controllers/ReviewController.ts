import ReviewModel from "../models/Reviews";
import { Request, Response } from "express";
import * as functionCRUD from "./utilsControllers";

export const create = async (req: Request, res: Response) => {
    await functionCRUD.funcForCreate(
        req,
        res,
        ReviewModel,
        ["user", "topText", "bottomText", "photos", "rating"],
        "Не удалось добавить отзыв"
    );
};

export const getAll = async (_: Request, res: Response) => {
    await functionCRUD.funcForGetAll(
        _,
        res,
        ReviewModel,
        "Не удалось получить отзывы"
    );
};

export const getOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForGetOne(req, res, ReviewModel, [
        "Отзыв не найден",
        "Не удалось вернуть отзыв",
        "Не удалось получить отзыв",
    ]);
};

export const deleteOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForDeleteOne(req, res, ReviewModel, [
        "Отзыв не найден",
        "Не удалось вернуть отзыв",
        "Не удалось получить отзыв",
    ]);
};

export const updateOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForUpdateOne(
        req,
        res,
        ReviewModel,
        ["user", "topText", "bottomText", "photos", "rating"],
        [
            "Отзыв не найден",
            "Не удалось вернуть отзыв",
            "Не удалось получить отзыв",
        ]
    );
};
