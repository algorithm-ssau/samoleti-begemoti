import { MongoWorker } from "./MongoWorker";
import HotelModel from "../models/Hotel";
import { Hotel } from "samolet-common";
import { AddressMongoWorker } from "./AddressMongoWorker";
import { RoomMongoWorker } from "./RoomMongoWorker";

export class HotelMongoWorker extends MongoWorker<Hotel, typeof HotelModel> {
    constructor() {
        super(HotelModel);
    }

    static instance() {
        return new HotelMongoWorker();
    }

    createFull = async (hotel: Hotel) => {
        const addressMongo = AddressMongoWorker.instance();
        const roomMongo = RoomMongoWorker.instance();
        const address = await addressMongo.create(hotel.address);

        if (!address) return "address-failure";
        const x = hotel.rooms.map(room => roomMongo.create(room));

        const rooms = await Promise.all(x);
        if (!rooms) return "room-failure";
        const { price, name, description } = hotel;

        console.log(JSON.stringify(hotel));
        const photos = hotel.photos;
        const hotelDoc = await this.MyModel.create({
            name,
            description,
            photos,
            address: address._id,
            rooms: rooms.map(r => r._id),
            reviews: [],
            price,
        });

        const result = await hotelDoc.populate(["address", "rooms"]);
        return result;
    };
}
