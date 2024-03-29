import PhotoModel from "../models/Photo";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
    try {
        const doc = new PhotoModel({
            imageUrl: req.body.imageUrl,
        });
        const photo = await doc.save();
        res.json(photo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось добавить фото",
        });
    }
};

export const getAll = async (_: Request, res: Response) => {
    try {
        const photos = await PhotoModel.find().exec();
        res.json(photos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить фото",
        });
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const photoId = req.params.id;
        PhotoModel.findOne({ _id: photoId })
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Фото не найдено",
                    });
                }
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось вернуть фото",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить фото",
        });
    }
};

export const deleteOne = async (req: Request, res: Response) => {
    try {
        const photoId = req.params.id;
        PhotoModel.findOneAndDelete({
            _id: photoId,
        })
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Фото не найдено",
                    });
                }
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось вернуть фото",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить фото",
        });
    }
};

export const updateOne = async (req: Request, res: Response) => {
    try {
        const photoId = req.params.id;
        PhotoModel.findOneAndUpdate(
            {
                _id: photoId,
            },
            {
                imageUrl: req.body.imageUrl,
            }
        )
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: "Фото не найдено",
                    });
                }
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({
                    message: "Не удалось вернуть фото",
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить фото",
        });
    }
};
