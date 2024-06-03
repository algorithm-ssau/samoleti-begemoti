import type { HotelInfoProps } from "../components/Hotel/Hotel";
import { hotelInfo } from "../example_data/hotels";

interface HotelInfo {
    info: HotelInfoProps;
}

export function getHotel(id: string): HotelInfo {
    return { info: hotelInfo.find(hotel => hotel.id === id)! };
}
