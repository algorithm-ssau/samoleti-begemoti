import { RequestHandler } from "express";
import { ProfileRequestParser } from "../request-parsers/ProfileRequestParser";
import { UserMongoWorker } from "../mongoworkers/UserMongoWorker";
import { log, testOnly, warn } from "../log";
import { hash } from "./NewUserController";

export class ProfileController {
    private parser = new ProfileRequestParser();

    updatePassword: RequestHandler = async (req, res) => {
        const userWorker = new UserMongoWorker();

        const changePassword = this.parser.changePassword(req);
        const email = changePassword.userEmail;

        const result = await userWorker.changePassword(changePassword);
        if (result == "user-not-found") {
            warn(
                `user '${email}' tried to change password, but failed to exist. Loser.`
            );
            res.status(418).json({
                message: "user doesn't exist",
            });
            return;
        }

        if (result == "wrong-password") {
            log(
                `user '${email} tried to change password, but provided old password doesn't match`
            );

            res.status(403).json({
                message: "provided old password doesn't match",
            });
            return;
        }

        log(`update password for user '${result.email}'`);
        return res.status(200).json();
    };
}
