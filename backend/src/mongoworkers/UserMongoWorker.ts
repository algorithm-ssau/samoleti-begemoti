import { Model } from "mongoose";
import { MongoWorker } from "./MongoWorker";
import { User } from "samolet-common";
import UserModel from "../models/User";
import { hash } from "../controllers/NewUserController";
import { ChangePassword } from "../request-parsers/ProfileRequestParser";

export class UserMongoWorker extends MongoWorker<User, typeof UserModel> {
    constructor() {
        super(UserModel);
    }

    /**
     * return single user with matching email or false
     */
    byEmail(email: string) {
        return this.getOneByKey("email", email);
    }

    createBlank(email: string, passwordHash: string) {
        return this.MyModel.create({ email, passwordHash });
    }

    byCredentials(email: string, password: string) {
        const passwordHash = hash(password);
        return this.MyModel.findOneAndUpdate({
            email,
            passwordHash,
        });
    }

    changePassword(changePassword: ChangePassword) {
        const { userId, oldPassword, newPassword } = changePassword;

        const passwordHash = hash(oldPassword);
        const newHash = hash(newPassword);
        return this.MyModel.findOneAndUpdate(
            {
                _id: userId,
                passwordHash,
            },
            { passwordHash: newHash }
        );
    }
}
