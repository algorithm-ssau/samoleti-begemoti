import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { AuthNetwork } from "./auth";
import { AddressNetwork } from "./address";
import { HotelNetwork } from "./hotel";
import { HotelBookingNetwork } from "./hotelBooking";
import { HotelFacilityNetwork } from "./hotelFacility";
import { PhotoNetwork } from "./photo";
import { ReviewNetwork } from "./review";
import { RoomNetwork } from "./room";
import { RoomCategoryNetwork } from "./roomCategory";
import { UserNetwork } from "./user";
import { ProfileRequests } from "./profile";

export * from "./auth";
export * from "./profile";

export class Network {
    private axios: AxiosInstance;

    auth: AuthNetwork;
    address: AddressNetwork;
    hotel: HotelNetwork;
    hotelBooking: HotelBookingNetwork;
    hotelFacility: HotelFacilityNetwork;
    photo: PhotoNetwork;
    review: ReviewNetwork;
    room: RoomNetwork;
    roomCategory: RoomCategoryNetwork;
    user: UserNetwork;
    profile: ProfileRequests;

    constructor(
        private getInstance: (config: CreateAxiosDefaults) => AxiosInstance
    ) {
        this.axios = getInstance({});
        this.auth = new AuthNetwork(this.axios);
        this.address = new AddressNetwork(this.axios);
        this.hotel = new HotelNetwork(this.axios);
        this.hotelBooking = new HotelBookingNetwork(this.axios);
        this.hotelFacility = new HotelFacilityNetwork(this.axios);
        this.photo = new PhotoNetwork(this.axios);
        this.review = new ReviewNetwork(this.axios);
        this.room = new RoomNetwork(this.axios);
        this.roomCategory = new RoomCategoryNetwork(this.axios);
        this.user = new UserNetwork(this.axios);
        this.profile = new ProfileRequests(this.axios);
    }

    setToken(token: string) {
        this.axios = this.getInstance({
            headers: {
                Authorization: token,
            },
        });

        this.auth.setAxios(this.axios);
        this.address.setAxios(this.axios);
        this.hotel.setAxios(this.axios);
        this.hotelBooking.setAxios(this.axios);
        this.hotelFacility.setAxios(this.axios);
        this.photo.setAxios(this.axios);
        this.review.setAxios(this.axios);
        this.room.setAxios(this.axios);
        this.roomCategory.setAxios(this.axios);
        this.user.setAxios(this.axios);
        this.profile.setAxios(this.axios);
    }
}
