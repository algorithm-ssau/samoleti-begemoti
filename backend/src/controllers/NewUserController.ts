import { Request, RequestHandler, Response } from "express";
import { UserRequestParser } from "../request-parsers/UserRequestParser";
import { UserMongoWorker } from "../mongoworkers/UserMongoWorker";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ACCESS_EXPIRES_IN, jwt_access } from "../config";
import { ObjectId } from "mongodb";
import { NewGenericController } from "./NewGenericController";
import { User } from "samolet-common";

export class NewUserController extends NewGenericController<
    User,
    UserRequestParser,
    UserMongoWorker
> {
    constructor() {
        super(new UserRequestParser(), new UserMongoWorker());
    }

    register: RequestHandler = async (req, res) => {
        const { email, password } = this.parser.parseUserCredentials(req);
        if (await this.mongo.byEmail(email)) {
            return res.status(403).json({
                message: "Пользователь с такой почтой уже существует",
            });
        } else {
            const passwordHash = hash(password);
            const user = await this.mongo.createBlank(email, passwordHash);

            res.status(200).json({
                token: signToken({
                    user_id: user._id,
                    email: user.email,
                }),
            });
        }
    };

    login: RequestHandler = async (req, res) => {
        const { email, password } = this.parser.parseUserCredentials(req);
        const user = await this.mongo.byEmail(email);
        if (!user || !samePassword(password, user.passwordHash)) {
            console.log(`wrong login/password combination for user '${email}'`);
            return res.status(401).json({
                message: "Неверный логин и/или пароль",
            });
        }
        console.log(`successful authorization for user '${user.email}'`);
        res.status(200).json({
            token: signToken({
                user_id: user._id,
                email: user.email,
            }),
        });
    };

    logout: RequestHandler = async (req: Request, res: Response) => {
        // TODO: invalidate token.

        res.status(200).send();
    };
}

function signToken(user: { user_id: ObjectId; email: string }): string {
    return jwt.sign(user, jwt_access, { expiresIn: ACCESS_EXPIRES_IN });
}

export function samePassword(password: string, savedHash: string): boolean {
    return bcrypt.compareSync(password, savedHash);
}

export function hash(password: string): string {
    return bcrypt.hashSync(password, 7);
}

export function genericMongoResponse<T>(
    response: Response,
    value: T | false,
    errorStatus?: number
) {
    if (value) {
        response.status(200).json(value);
    } else {
        response.sendStatus(errorStatus ?? 404);
    }
}
