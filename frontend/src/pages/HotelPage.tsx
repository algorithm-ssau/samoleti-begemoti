import { getHotel } from "../util/util";
import { HotelInfoCard } from "../components/Hotel/Hotel";
import { HotelReviewsBlock } from "../components/HotelReviewComponent/HotelReview";
import { HotelRooms } from "../components/HotelRoom";
import { hotelThunks, useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import type { TRoom } from "samolet-common/src/network/room";
import type { Address } from "samolet-common";
import { formatAddress } from "../components/Profile/Booking/Booking";

interface Props {
    id: string;
}
export function HotelPage(props: Props) {
    const { id } = { id: "665c7e08cd804521a1eed768" }; //props;
    const dispatch = useAppDispatch();
    const hotel = useAppSelector(state => state.requests.hotelById);
    useEffect(() => {
        dispatch(hotelThunks.hotelById(id));
    }, []);
    return (
        <div>
            <HotelInfoCard
                {...{
                    name: hotel.value?.name ?? "",
                    id: hotel.value?._id ?? "",
                    aboutHotel: hotel.value?.description ?? "",
                    address: hotel.value?.address
                        ? formatAddress(hotel.value?.address)
                        : "",
                }}
            />
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
