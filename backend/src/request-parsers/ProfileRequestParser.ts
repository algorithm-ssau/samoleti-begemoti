import { Request } from "express";
import { BaseParser } from "./RequestParser";
import { assert } from "typia";
import { ChangePassword, PersonalInfo } from "samolet-common";

export class ProfileRequestParser extends BaseParser {
    changePassword(req: Request): ChangePassword {
        const userEmail = req.claim!.email;
        const { newPassword, oldPassword } = req.body;

        return assert<ChangePassword>({
            userEmail,
            oldPassword,
            newPassword,
        });
    }

    parseInfoBody(req: Request): Partial<PersonalInfo> {
        return assert<Partial<PersonalInfo>>(req.body);
    }
}
