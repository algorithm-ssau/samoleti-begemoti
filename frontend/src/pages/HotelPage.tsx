import { getHotel } from "../util/util";
import { HotelInfoCard } from "../components/Hotel/Hotel";
import { HotelReviewsBlock } from "../components/HotelReviewComponent/HotelReview";
import HotelRoom from "../components/HotelRoom";
import { actions, useAppDispatch } from "../store/store";

interface Props {
    id: number;
}
export function HotelPage(props: Props) {
    const { id } = props;
    let hotel = getHotel(id);

    const dispatch = useAppDispatch();

    return (
        <div>
            <HotelInfoCard {...hotel.info} />
            <HotelRoom />
            <HotelReviewsBlock hotelId={id} />
        </div>
    );
}
