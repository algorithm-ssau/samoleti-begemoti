import { Booking, BookingRequest } from "samolet-common";
import HotelBooking from "../models/HotelBooking";
import { MongoWorker } from "./MongoWorker";
import User from "../models/User";

export class BookingMongoWorker extends MongoWorker<
    Booking,
    typeof HotelBooking
> {
    constructor() {
        super(HotelBooking);
    }
    //TODO: add validation
    newBooking = async (userId: string, bookingRequest: BookingRequest) => {
        const { dateFrom, dateTo, hotelId, roomId } = bookingRequest;

        const user = await User.findById(userId);

        if (!user) {
            return "user-not-found";
        }

        const booking = await this.MyModel.create({
            dateFrom,
            dateTo,
            hotelId,
            roomId,
            status: "not-paid",
        });

        if (!booking) {
            return "failed-create-booking";
        }

        user.hotelHistory.push(booking);
        user.markModified("booking");
        return await user.save();
    };

    bookings = async (userId: string) => {
        const user = await User.findById(userId).populate("hotelHistory");

        if (!user) {
            return "user-not-found";
        }

        const bookings = user.hotelHistory.slice();

        return bookings;
    };
}
