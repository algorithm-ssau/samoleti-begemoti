import HotelModel from "../models/Hotel";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
    try {
        const doc = new HotelModel({
            name: req.body.name,
            description: req.body.description,
            photos: req.body.photos,
            address: req.body.address,
            rooms: req.body.rooms,
            reviews: req.body.reviews,
        });
        const hotel = await doc.save();
        res.json(hotel);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось добавить отель",
        });
    }
};

export const getAll = async (_: Request, res: Response) => {
    try {
        const hotel = await HotelModel.find()
            .populate(["photos", "address", "rooms", "reviews"])
            .exec();
        res.json(hotel);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить отели",
        });
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const hotelId = req.params.id;
        HotelModel.findOne({ _id: hotelId })
            .then((doc) => {
                if (!doc) {
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

export const getByPlace = async (req: Request, res: Response) => {
    try {
        const placeName = req.query.place;
        if (!placeName) {
            return res.status(40).json({
                message: "Неверный запрос",
            });
        }
        console.log(placeName);
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
                if (!doc) {
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
    try {
        const hotelId = req.params.id;
        HotelModel.findOneAndDelete({
            _id: hotelId,
        })
            .then((doc) => {
                if (!doc) {
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

export const updateOne = async (req: Request, res: Response) => {
    try {
        const hotelId = req.params.id;
        HotelModel.findOneAndUpdate(
            {
                _id: hotelId,
            },
            {
                name: req.body.name,
                description: req.body.description,
                photos: req.body.photosId,
                address: req.body.addressId,
                rooms: req.body.roomsId,
                reviews: req.body.reviewsId,
            }
        )
            .then((doc) => {
                if (!doc) {
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
