/**
 * This is stored in db.
 */
export type Booking = {
    dateFrom: Date;
    dateTo: Date;

    hotelId: string;
    /**
     * room type id
     */
    roomId: string;
    status: BookingStatus;
};

export type BookingStatus = "paid" | "not-paid" | "finished" | "in-process";

/**
 * This is used for network requests.
 *
 * date is represented using milliseconds since unix epoch
 *
 * data for this request should be taken from GET /hotel/:id/
 */
export type BookingRequest = {
    /**
     * unix epoch milliseconds
     */
    dateFrom: number;
    /**
     * unix epoch milliseconds
     */
    dateTo: number;

    hotelId: string;
    /**
     * room type id
     */
    roomId: string;
};
