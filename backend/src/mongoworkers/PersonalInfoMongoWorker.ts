import { PersonalInfo } from "samolet-common";
import { Model } from "mongoose";
import { MongoWorker } from "./MongoWorker";
import { PersonalInfoModel } from "../models/PersonalInfo";

export class PersonalInfoMongoWorker extends MongoWorker<
    PersonalInfo,
    Model<PersonalInfo>
> {
    constructor() {
        super(PersonalInfoModel);
    }
}
