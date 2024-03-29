import RoomModel from "../models/Rooms";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
    try {
        const doc = new RoomModel({
            category: req.body.category,
            price: req.body.price,
            bedAmount: req.body.bedAmount,
            facilities: req.body.facilities,
            number: req.body.number,
        });
        const room = await doc.save();
        res.json(room);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось добавить комнату",
        });
    }
};

export const getAll = async (_: Request, res: Response) => {
    try {
        const rooms = await RoomModel.find().exec();
        res.json(rooms);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить комнату",
        });
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const roomId = req.params.id;
        RoomModel.findOne({ _id: roomId })
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Комната не найдена",
                    });
                }
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось вернуть комнату",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить комнату",
        });
    }
};

export const deleteOne = async (req: Request, res: Response) => {
    try {
        const roomId = req.params.id;
        const room = await RoomModel.findOneAndDelete({
            _id: roomId,
        })
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Комната не найдена",
                    });
                }
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось вернуть комнату",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить комнату",
        });
    }
};

export const updateOne = async (req: Request, res: Response) => {
    try {
        const roomId = req.params.id;
        const room = await RoomModel.findOneAndUpdate(
            {
                _id: roomId,
            },
            {
                category: req.body.category,
                price: req.body.price,
                bedAmount: req.body.bedAmount,
                facilities: req.body.facilities,
                number: req.body.number,
            }
        )
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Комната не найдена",
                    });
                }
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось вернуть комнату",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить комнату",
        });
    }
};
