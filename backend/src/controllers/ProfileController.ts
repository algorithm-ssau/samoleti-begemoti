import { RequestHandler } from "express";
import { ProfileRequestParser } from "../request-parsers/ProfileRequestParser";
import { UserMongoWorker } from "../mongoworkers/UserMongoWorker";
import { log, testOnly, warn } from "../log";
import { hash } from "./NewUserController";
import { PersonalInfoMongoWorker } from "../mongoworkers/PersonalInfoMongoWorker";
import { ObjectId } from "mongodb";
import { PersonalInfo } from "samolet-common";

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

    info: RequestHandler = async (req, res) => {
        const mongo = new UserMongoWorker();
        const id = req.claim!.user_id;
        const email = req.claim!.email;
        const result = await mongo.info(id);

        if (result == "user-not-found") {
            warn(
                `user '${email}' tried to get own info, but failed to exist. Loser.`
            );
            res.status(418).json({
                message: "user doesn't exist",
            });
            return;
        }

        if (result == "info-not-set") {
            log(`user '${email} tried to get own info, but info wasn't set`);

            res.status(200).json({});
            return;
        }

        return res.status(200).json(result);
    };

    updateInfo: RequestHandler = async (req, res) => {
        const userMongo = new UserMongoWorker();
        const infoMongo = new PersonalInfoMongoWorker();

        const info = this.parser.parseInfoBody(req);
        const id = req.claim!.user_id;
        const email = req.claim!.email;
        const user = await userMongo.byEmail(email);

        if (!user) {
            warn(
                `user '${email}' tried to update own info, but failed to exist. Loser.`
            );
            res.status(418).json({
                message: "user doesn't exist",
            });
            return;
        }

        const infoId = user.info as ObjectId;

        const result = await infoMongo.updateOne(infoId, info as PersonalInfo);

        if (!result) {
            warn(`failed to update personal info of user ${email}`);
            res.status(500).send();
        }

        res.status(200).send();
    };
}
