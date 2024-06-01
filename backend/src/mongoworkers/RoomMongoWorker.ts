import { MongoWorker } from "./MongoWorker";
import { Room } from "samolet-common";
import RoomModel from "../models/Rooms";

export class RoomMongoWorker extends MongoWorker<Room, typeof RoomModel> {
    constructor() {
        super(RoomModel);
    }

    static instance() {
        return new RoomMongoWorker();
    }
}
