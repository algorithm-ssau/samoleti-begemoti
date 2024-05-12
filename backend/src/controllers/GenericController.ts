import { Request, Response } from "express";
import { Model } from "mongoose";

const helpfulErrorMessage = `Unknown error, override *ErrorMessages() methods your own messages`;

export class GenericController<T, M extends Model<T>> {
    constructor(private MyModel: M) {
        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getOne = this.getOne.bind(this);
        this.updateOne = this.updateOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
    }

    createErrorMessages(): [string] {
        return [helpfulErrorMessage];
    }

    getAllErrorMessages(): [string] {
        return [helpfulErrorMessage];
    }

    getOneErrorMessages(): [string, string, string] {
        return [helpfulErrorMessage, helpfulErrorMessage, helpfulErrorMessage];
    }

    deleteErrorMessages(): [string, string, string] {
        return [helpfulErrorMessage, helpfulErrorMessage, helpfulErrorMessage];
    }

    updateOneErrorMessages(): [string, string, string] {
        return [helpfulErrorMessage, helpfulErrorMessage, helpfulErrorMessage];
    }

    async create(req: Request, res: Response) {
        const errorMessages = this.createErrorMessages();
        try {
            let modelData: Record<string, any> = {};
            const definition = this.MyModel.schema.obj;
            Object.keys(definition).map(key => {
                modelData[key] = req.body[key];
            });
            const doc = new this.MyModel(modelData);
            const result = await doc.save();
            res.status(201).json(result);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: errorMessages[0],
            });
        }
    }

    // async createOnlyOne(req: Request, res: Response){
    //     if (condition) {
            
    //     }
    // }

    async getAll(_: Request, res: Response) {
        const refKeys = getRefKeys(this.MyModel);
        const keys = getKeys(this.MyModel);
        const errorMessages = this.getAllErrorMessages();
        try {
            let query = (this.MyModel as Model<any>).find();
            if (refKeys.length > 0) {
                query = query.populate(refKeys);
            }
            const values = await query.exec();

            res.status(200).json(values);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: errorMessages[0],
            });
        }
    }

    async getOne(req: Request, res: Response) {
        const errorMessages = this.getOneErrorMessages();
        const refKeys = getRefKeys(this.MyModel);
        try {
            const valueId = req.params.id;
            let query = (this.MyModel as Model<any>).findOne({ _id: valueId });

            if (refKeys.length > 0) {
                query = query.populate(refKeys);
            }
            query
                .then((doc: string) => {
                    if (!doc) {
                        return res.status(404).json({
                            message: errorMessages[0],
                        });
                    }
                    res.status(200).json(doc);
                })
                .catch((error: string) => {
                    console.log(error);
                    return res.status(500).json({
                        message: errorMessages[1],
                    });
                });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: errorMessages[2],
            });
        }
    }

    deleteOne = async (req: Request, res: Response) => {
        const errorMessage = this.deleteErrorMessages();
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
                message: errorMessage[2],
            });
        }
    };

    async updateOne(req: Request, res: Response) {
        const errorMessage = this.updateOneErrorMessages();
        try {
            let modelData: { [key: string]: any } = {};
            getKeys(this.MyModel).map(key => {
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
    }
}

export function getKeys<M extends Model<any>>(MyModel: M): string[] {
    return Object.keys(MyModel.schema.obj);
}

export function getRefKeys<M extends Model<any>>(model: M): string[] {
    const definition = model.schema.obj as Record<string, any>;
    const refKeys = Object.keys(definition).filter(
        key => definition[key].ref || definition[key][0]?.ref
    );
    return refKeys;
}
