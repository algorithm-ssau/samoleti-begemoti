import HotelModel from "../models/Hotel";
import { Request, Response } from "express";
import * as functionCRUD from "./utilsControllers";

export const create = async (req: Request, res: Response) => {
    await functionCRUD.funcForCreate(
        req,
        res,
        HotelModel,
        ["name", "description", "photos", "address", "rooms", "reviews"],
        "Не удалось создать отель"
    );
};

export const getAll = async (_: Request, res: Response) => {
    await functionCRUD.funcForGetAllWithPopulate(
        _,
        res,
        HotelModel,
        ["photos", "address", "rooms", "reviews"],
        "Не удалось получить адреса"
    );
};

export const getOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForGetOneWithPopulate(
        req,
        res,
        HotelModel,
        ["photos", "address", "rooms", "reviews"],
        [
            "Отель не найден",
            "Не удалось вернуть отель",
            "Не удалось получить отель",
        ]
    );
};

export const getByPlace = async (req: Request, res: Response) => {
    try {
        const placeName = req.query.place;
        if (!placeName) {
            return res.status(400).json({
                message: "Неверный запрос",
            });
        }
        HotelModel.aggregate([
            {
                $lookup: {
                    from: "addresses",
                    localField: "address",
                    foreignField: "_id",
                    as: "address",
                },
            },
            {
                $match: {
                    "address.place": placeName,
                },
            },
            { $unwind: "$address" },
            {
                $lookup: {
                    from: "photos",
                    localField: "photos",
                    foreignField: "_id",
                    as: "photos",
                },
            },
            {
                $lookup: {
                    from: "rooms",
                    localField: "rooms",
                    foreignField: "_id",
                    as: "rooms",
                },
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "reviews",
                    foreignField: "_id",
                    as: "reviews",
                },
            },
        ])
            .then((doc) => {
                if (doc.length === 0) {
                    return res.status(404).json({
                        message: "Отель не найден",
                    });
                }
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось вернуть отель",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить отель",
        });
    }
};

export const deleteOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForDeleteOne(req, res, HotelModel, [
        "Отель не найден",
        "Не удалось вернуть отель",
        "Не удалось получить отель",
    ]);
};

export const updateOne = async (req: Request, res: Response) => {
    await functionCRUD.funcForUpdateOne(
        req,
        res,
        HotelModel,
        ["name", "description", "photos", "address", "rooms", "reviews"],
        [
            "Отель не найден",
            "Не удалось вернуть отель",
            "Не удалось получить отель",
        ]
    );
};
