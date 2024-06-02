import { RequestHandler, Response } from "express";
import { MongoWorker } from "../mongoworkers/MongoWorker";
import { AnyObject, Model } from "mongoose";
import { RequestParser } from "../request-parsers/RequestParser";

export class NewGenericController<
    T extends AnyObject,
    Parser extends RequestParser<T>,
    Mongo extends MongoWorker<T, Model<T>>
> {
    constructor(protected parser: Parser, protected mongo: Mongo) {}

    create: RequestHandler = async (req, res) => {
        const user = this.parser.parseCreate(req);

        const result = await this.mongo.create(user);
        genericMongoResponse(res, result, 500);
    };

    getAll: RequestHandler = async (req, res) => {
        const users = await this.mongo.getAll();
        genericMongoResponse(res, users);
    };

    getOne: RequestHandler = async (req, res) => {
        const id = this.parser.parseGetSingle(req);
        const single = await this.mongo.getOne(id);
        genericMongoResponse(res, single);
    };

    deleteOne: RequestHandler = async (req, res) => {
        const id = this.parser.parseGetSingle(req);
        const result = await this.mongo.deleteOne(id);
        genericMongoResponse(res, result);
    };

    updateOne: RequestHandler = async (req, res) => {
        const { id, user } = this.parser.parseUpdateSingle(req);

        const result = await this.mongo.updateOne(id, user);
        genericMongoResponse(res, result);
    };
}

export function genericMongoResponse<T>(
    response: Response,
    value: T | false,
    errorStatus?: number
) {
    if (value) {
        console.log(`OK 200`);
        response.status(200).json(value);
    } else {
        console.log(`ERR ${errorStatus}`);
        response.sendStatus(errorStatus ?? 404);
    }
}
