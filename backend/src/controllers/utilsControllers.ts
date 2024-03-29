import { Request, Response } from "express";
import { Model } from "mongoose";
import { Document } from "mongoose";

export const create = async (
    req: Request,
    res: Response,
    Model: Model<Document>
) => {
    try {
        const doc = new Model({
            city: req.body.city,
            country: req.body.country,
            place: req.body.place,
        });
        const result = await doc.save();
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось создать документ",
        });
    }
};
