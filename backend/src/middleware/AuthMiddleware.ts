import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwt_access } from "../config";
import { User } from "../types/user_type";
import { is } from "typia";
import { UserClaim } from "../request";

export function authMiddleware(req: Request, res: Response, next: () => void) {
    const token = req.header("authorization");

    if (token != null) {
        try {
            const payload = jwt.verify(token, jwt_access);
            if (is<UserClaim>(payload)) {
                console.log(`user '${payload.email}' requested '${req.url}'`);

                req.claim = payload;
                next();
            } else {
                console.log(
                    `user requested '${
                        req.url
                    }' with valid token, but payload had wrong format '${JSON.stringify(
                        payload
                    )}'`
                );

                res.sendStatus(400);
            }
        } catch (error) {
            console.log(
                `user requested '${req.url}', but provided token is not valid`
            );
            console.log(error);
            res.sendStatus(401);
        }
    } else {
        console.log(`user requested '${req.url}', but no token is provided`);
        res.sendStatus(401);
    }
}
