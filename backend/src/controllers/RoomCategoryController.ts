import RoomCategoryModel from "../models/RoomCategory";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
    try {
        const doc = new RoomCategoryModel({
            name: req.body.name,
        });
        const roomCategory = await doc.save();
        res.json(roomCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось добавить категорию комнаты",
        });
    }
};

export const getAll = async (_: Request, res: Response) => {
    try {
        const roomCategory = await RoomCategoryModel.find().exec();
        res.json(roomCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить категорию комнаты",
        });
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const roomCategoryId = req.params.id;
        RoomCategoryModel.findOne({ _id: roomCategoryId })
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Категория комнаты не найдена",
                    });
                }
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось вернуть категорию комнаты",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить категорию комнаты",
        });
    }
};

export const deleteOne = async (req: Request, res: Response) => {
    try {
        const roomCategoryId = req.params.id;
        RoomCategoryModel.findOneAndDelete({
            _id: roomCategoryId,
        })
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Категория комнаты не найдена",
                    });
                }
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось вернуть категорию комнаты",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить категорию комнаты",
        });
    }
};

export const updateOne = async (req: Request, res: Response) => {
    try {
        const roomCategoryId = req.params.id;
        RoomCategoryModel.findOneAndUpdate(
            {
                _id: roomCategoryId,
            },
            {
                name: req.body.name,
            }
        )
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Категория комнаты не найдена",
                    });
                }
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось вернуть категорию комнаты",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить категорию",
        });
    }
};
