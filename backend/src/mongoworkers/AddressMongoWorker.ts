import { MongoWorker } from "./MongoWorker";
import { Address } from "samolet-common";
import AddressModel from "../models/Address";

export class AddressMongoWorker extends MongoWorker<
    Address,
    typeof AddressModel
> {
    constructor() {
        super(AddressModel);
    }

    static instance() {
        return new AddressMongoWorker();
    }
}
