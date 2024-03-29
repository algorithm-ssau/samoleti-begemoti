import AddressModel from "../models/Address";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
    try {
        const doc = new AddressModel({
            city: req.body.city,
            country: req.body.country,
            place: req.body.place,
        });
        const address = await doc.save();
        res.json(address);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось создать адрес",
        });
    }
};

export const getAll = async (_: Request, res: Response) => {
    try {
        const addresses = await AddressModel.find().exec();
        res.json(addresses);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить адреса",
        });
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const addressId = req.params.id;
        AddressModel.findOne({ _id: addressId })
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Адрес не найден",
                    });
                }
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось вернуть адрес",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить адрес",
        });
    }
};

export const deleteOne = async (req: Request, res: Response) => {
    try {
        const addressId = req.params.id;
        AddressModel.findOneAndDelete({
            _id: addressId,
        })
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Адрес не найден",
                    });
                }
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось вернуть адрес",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить статью",
        });
    }
};

export const updateOne = async (req: Request, res: Response) => {
    try {
        const addressId = req.params.id;
        AddressModel.findOneAndUpdate(
            {
                _id: addressId,
            },
            {
                city: req.body.city,
                country: req.body.country,
                place: req.body.place,
            }
        )
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Адрес не найден",
                    });
                }
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось вернуть адрес",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить адрес",
        });
    }
};
