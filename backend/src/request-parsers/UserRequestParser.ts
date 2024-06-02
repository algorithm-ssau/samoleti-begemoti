import { Request } from "express";
import { RequestParser } from "./RequestParser";
import { User } from "samolet-common";
import { UserCredentials } from "samolet-common";
import { assert } from "typia";

export class UserRequestParser extends RequestParser<User> {
    parseBody(req: Request) {
        return assert<User>(req.body);
    }

    parseUserCredentials(req: Request): UserCredentials {
        const parsedBody = {
            email: req.body.login,
            password: req.body.password,
        };

        return assert<UserCredentials>(parsedBody);
    }
}
