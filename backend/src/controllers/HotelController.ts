import HotelModel from "../models/Hotel";
import { Request, Response } from "express";
import { GenericController } from "./GenericController";
import { Hotel } from "samolet-common/db_types";

export class HotelController extends GenericController<
    Hotel,
    typeof HotelModel
> {
    constructor() {
        super(HotelModel);
        this.getByPlace = this.getByPlace.bind(this);
    }

    deleteOneErrorMessages(): [string, string, string] {
        return [
            "Отель не найден",
            "Не удалось вернуть отель",
            "Не удалось получить отель",
        ];
    }

    updateOneErrorMessages(): [string, string, string] {
        return [
            "Отель не найден",
            "Не удалось вернуть отель",
            "Не удалось получить отель",
        ];
    }
    createErrorMessages(): [string] {
        return ["Не удалось создать отель"];
    }

    getAllErrorMessages(): [string] {
        return ["Не удалось получить адреса"];
    }

    getOneErrorMessages(): [string, string, string] {
        return [
            "Отель не найден",
            "Не удалось вернуть отель",
            "Не удалось получить отель",
        ];
    }
    async getByPlace(req: Request, res: Response) {
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
                .then(doc => {
                    if (doc.length === 0) {
                        return res.status(404).json({
                            message: "Отель не найден",
                        });
                    }
                    res.json(doc);
                })
                .catch(err => {
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
    }
}
