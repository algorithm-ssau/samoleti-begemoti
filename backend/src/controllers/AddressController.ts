import AddressModel from "../models/Address";
import { Request, Response } from "express";
import * as functionCRUD from "./utilsControllers";

export const create = async (req: Request, res: Response) => {
    await functionCRUD.funcForCreate(
        req,
        res,
        AddressModel,
        ["city", "country", "place"],
        "Не удалось создать адрес"
    );
};

export const getAll = async (_: Request, res: Response) => {
    await functionCRUD.funcForGetAll(
        _,
        res,
        AddressModel,
        "Не удалось получить адреса"
    );
};

export const getOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForGetOne(req, res, AddressModel, [
        "Адрес не найден",
        "Не удалось вернуть адрес",
        "Не удалось получить адрес",
    ]);
};

export const deleteOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForDeleteOne(req, res, AddressModel, [
        "Адрес не найден",
        "Не удалось вернуть адрес",
        "Не удалось получить адрес",
    ]);
};

export const updateOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForUpdateOne(
        req,
        res,
        AddressModel,
        ["city", "country", "place"],
        [
            "Адрес не найден",
            "Не удалось вернуть адрес",
            "Не удалось получить адрес",
        ]
    );
};
