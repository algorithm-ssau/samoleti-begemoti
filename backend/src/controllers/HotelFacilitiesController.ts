import HotelFacilityModel from "../models/HotelFacilities";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
    try {
        const doc = new HotelFacilityModel({
            name: req.body.name,
        });
        const hotelFacility = await doc.save();
        res.json(hotelFacility);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось добавить услугу отеля",
        });
    }
};

export const getAll = async (_: Request, res: Response) => {
    try {
        const hotelFacility = await HotelFacilityModel.find().exec();
        res.json(hotelFacility);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить услугу отеля",
        });
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const hotelFacilityId = req.params.id;
        HotelFacilityModel.findOne({ _id: hotelFacilityId })
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Услуга не найдена",
                    });
                }
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось вернуть услуги",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить услуги отеля",
        });
    }
};

export const deleteOne = async (req: Request, res: Response) => {
    try {
        const hotelFacilityId = req.params.id;
        HotelFacilityModel.findOneAndDelete({
            _id: hotelFacilityId,
        })
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Услуга не найдена",
                    });
                }
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось вернуть услуги",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить гостиничные удобства",
        });
    }
};

export const updateOne = async (req: Request, res: Response) => {
    try {
        const hotelFacilityId = req.params.id;
        HotelFacilityModel.findOneAndUpdate(
            {
                _id: hotelFacilityId,
            },
            {
                name: req.body.name,
            }
        )
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Услуга не найдена",
                    });
                }
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось вернуть услуги",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить гостиничные удобства",
        });
    }
};
