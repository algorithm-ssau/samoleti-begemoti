import ReviewModel from "../models/Reviews";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
    try {
        const doc = new ReviewModel({
            category: req.body.category,
            price: req.body.price,
            bedAmount: req.body.bedAmount,
            facilities: req.body.facilities,
            number: req.body.number,
        });
        const review = await doc.save();
        res.json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось добавить отзыв",
        });
    }
};

export const getAll = async (_: Request, res: Response) => {
    try {
        const reviews = await ReviewModel.find().exec();
        res.json(reviews);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось получить комнату",
        });
    }
};

export const getOne = async (req: Request, res: Response) => {
    try {
        const reviewId = req.params.id;
        ReviewModel.findOne({ _id: reviewId })
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
        const reviewId = req.params.id;
        ReviewModel.findOneAndDelete({
            _id: reviewId,
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
        const reviewId = req.params.id;
        ReviewModel.findOneAndUpdate(
            {
                _id: reviewId,
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
