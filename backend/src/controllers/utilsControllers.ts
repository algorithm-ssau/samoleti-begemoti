import { Request, Response } from "express";
import { Model } from "mongoose";

export const funcForCreate = async (
    req: Request,
    res: Response,
    Model: Model<any>,
    objKeys: Array<string>,
    errorMessage: string
) => {
    try {
        let modelData: { [key: string]: any } = {};
        objKeys.map((key) => {
            modelData[key] = req.body[key];
        });
        const doc = new Model(modelData);
        const result = await doc.save();
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: errorMessage,
        });
    }
};

export const funcForGetAll = async (
    _: Request,
    res: Response,
    Model: Model<any>,
    errorMessage: string
) => {
    try {
        const values = await Model.find().exec();
        res.status(200).json(values);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: errorMessage,
        });
    }
};

export const funcForGetAllWithPopulate = async (
    _: Request,
    res: Response,
    Model: Model<any>,
    populateArr: Array<string>,
    errorMessage: string
) => {
    try {
        const values = await Model.find().populate(populateArr).exec();
        res.status(200).json(values);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: errorMessage,
        });
    }
};

export const funcForGetOne = async (
    req: Request,
    res: Response,
    Model: Model<any>,
    errorMessage: Array<string>
) => {
    try {
        const valueId = req.params.id;
        Model.findOne({ _id: valueId })
            .then((doc: string) => {
                if (!doc) {
                    return res.status(404).json({
                        message: errorMessage[0],
                    });
                }
                res.status(200).json(doc);
            })
            .catch((error: string) => {
                console.log(error);
                return res.status(500).json({
                    message: errorMessage[1],
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: errorMessage[2],
        });
    }
};

export const funcForGetOneWithPopulate = async (
    req: Request,
    res: Response,
    Model: Model<any>,
    populateArr: Array<string>,
    errorMessage: Array<string>
) => {
    try {
        const valueId = req.params.id;
        Model.findOne({ _id: valueId })
            .populate(populateArr)
            .then((doc: string) => {
                if (!doc) {
                    return res.status(404).json({
                        message: errorMessage[0],
                    });
                }
                res.status(200).json(doc);
            })
            .catch((error: string) => {
                console.log(error);
                return res.status(500).json({
                    message: errorMessage[1],
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: errorMessage[2],
        });
    }
};

export const funcForDeleteOne = async (
    req: Request,
    res: Response,
    Model: Model<any>,
    errorMessage: Array<string>
) => {
    try {
        const valueId = req.params.id;
        Model.findOneAndDelete({
            _id: valueId,
        })
            .then((doc: string) => {
                if (!doc) {
                    return res.status(404).json({
                        message: errorMessage[0],
                    });
                }
                res.status(200).json(doc);
            })
            .catch((error: string) => {
                console.log(error);
                return res.status(500).json({
                    message: errorMessage[1],
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: errorMessage[3],
        });
    }
};

export const funcForUpdateOne = async (
    req: Request,
    res: Response,
    Model: Model<any>,
    objKeys: Array<string>,
    errorMessage: Array<string>
) => {
    try {
        let modelData: { [key: string]: any } = {};
        objKeys.map((key) => {
            modelData[key] = req.body[key];
        });
        const valueId = req.params.id;
        Model.findOneAndUpdate(
            {
                _id: valueId,
            },
            modelData
        )
            .then((doc: string) => {
                if (!doc) {
                    return res.status(404).json({
                        message: errorMessage[0],
                    });
                }
                res.status(200).json(doc);
            })
            .catch((error: string) => {
                console.log(error);
                return res.status(500).json({
                    message: errorMessage[1],
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: errorMessage[2],
        });
    }
};
