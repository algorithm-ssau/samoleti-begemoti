import { useEffect } from "react";

import { useParams } from "react-router";

import type { TRoom } from "samolet-common/src/network/room";
import type { THotel } from "samolet-common/src/network/hotel";

import { hotelThunks, useAppDispatch, useAppSelector } from "../store/store";

import { HotelInfoCard } from "../components/Hotel/Hotel";
import { HotelReviewsBlock } from "../components/HotelReviewComponent/HotelReview";
import { HotelRooms } from "../components/HotelRoom";
import { formatAddress } from "../components/Profile/Booking/Booking";

interface RouteParams {
    id: string;
}
export function HotelPage() {
    const { id } = useParams<keyof RouteParams>() as RouteParams;

    const dispatch = useAppDispatch();
    const hotel = useAppSelector(state => state.requests.hotelById);
    useEffect(() => {
        dispatch(hotelThunks.hotelById(id));
    }, []);

    if (hotel.value == null) {
        return <div>так, падажжи</div>;
    }

    return (
        <div>
            <HotelInfoCard {...convertHotelToProps(hotel.value)} />
            {hotel.value?.rooms.length ? (
                <HotelRooms
                    {...{ hotelId: id, rooms: hotel.value!.rooms as TRoom[] }}
                />
            ) : (
                <></>
            )}
            <HotelReviewsBlock hotelId={id} />
        </div>
    );
}

function convertHotelToProps(hotelFromRequest: THotel) {
    const { name, _id, description, address } = hotelFromRequest;
    return {
        name,
        id: _id,
        aboutHotel: description,
        address: address ? formatAddress(address) : "",
    };
}
