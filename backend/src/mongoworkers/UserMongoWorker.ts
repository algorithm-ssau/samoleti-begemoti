import { Model } from "mongoose";
import { MongoWorker, getRefKeys } from "./MongoWorker";
import { ChangePassword, PersonalInfo, User } from "samolet-common";
import UserModel from "../models/User";
import { hash, samePassword } from "../controllers/NewUserController";
import { PersonalInfoModel } from "../models/PersonalInfo";

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
        const user = await this.MyModel.create({ email, passwordHash });

        const info = await PersonalInfoModel.create({});
        user.info = info;
        user.markModified("info");
        return await user.save();
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

    info = async (userId: string) => {
        const result = await this.MyModel.findById(userId).populate(
            getRefKeys(this.MyModel)
        );

        if (!result) {
            return "user-not-found";
        }

        if (!result.info) {
            return "info-not-set";
        }

        return result.info;
    };

    updateInfo = async (userId: string, info: PersonalInfo) => {
        return await this.MyModel.findByIdAndUpdate(userId, { info });
    };
}
