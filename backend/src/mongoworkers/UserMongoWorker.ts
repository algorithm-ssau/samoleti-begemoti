import { Model } from "mongoose";
import { MongoWorker } from "./MongoWorker";
import { ChangePassword, User } from "samolet-common";
import UserModel from "../models/User";
import { hash, samePassword } from "../controllers/NewUserController";

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

    async createBlank(email: string, passwordHash: string) {
        return await this.MyModel.create({ email, passwordHash });
    }

    async deleteByEmail(email: string) {
        return await this.MyModel.deleteOne({ email });
    }

    byCredentials(email: string, password: string) {
        const passwordHash = hash(password);
        return this.MyModel.findOneAndUpdate({
            email,
            passwordHash,
        });
    }

    async changePassword(changePassword: ChangePassword) {
        const { userEmail, oldPassword, newPassword } = changePassword;

        const user = await this.MyModel.findOne({
            email: userEmail,
        });

        if (!user) {
            return "user-not-found";
        }

        if (!samePassword(oldPassword, user.passwordHash)) {
            return "wrong-password";
        }

        user.passwordHash = hash(newPassword);

        return await user.save();
    }
}
