import HotelModel from "../models/Hotel";
import { Request, Response } from "express";
import { Hotel } from "samolet-common";
import { NewGenericController } from "./NewGenericController";
import { HotelMongoWorker } from "../mongoworkers/HotelMongoWorker";
import { HotelRequestParser } from "../request-parsers/HotelRequestParser";
import { RequestHandler } from "express-serve-static-core";
import { warn } from "../log";

export class HotelController extends NewGenericController<
    Hotel,
    HotelRequestParser,
    HotelMongoWorker
> {
    constructor() {
        super(new HotelRequestParser(), new HotelMongoWorker());
        this.getByPlace = this.getByPlace.bind(this);
    }

    createFull: RequestHandler = async (req, res) => {
        const hotel = this.parser.parseCreateRequest(req);

        const price = hotel.rooms.reduce(
            (minPrice, room) => Math.min(minPrice, room.price ?? 1000),
            9999
        );

        const hotelObj: Hotel = {
            ...hotel,
            price,
            reviews: [],
        } as any as Hotel;

        const result = await this.mongo.createFull(hotelObj);

        if (result === "address-failure") {
            warn("failed to create address");
            res.status(500).send();
            return;
        }
        if (result === "room-failure") {
            warn("failed to create rooms");
            res.status(500).send();
        }
        if (!result) {
            warn(`failed to create hotel`);
            res.status(500).send();
        }
        res.status(200).send(result);
    };

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
