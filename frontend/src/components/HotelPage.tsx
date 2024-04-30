import { getHotel } from "../util/util";
import { HotelInfoCard } from "./Hotel/Hotel";
import { HotelReviewsBlock } from "./HotelReviewComponent/HotelReview";

interface Props {
    id: number;
}
export function HotelPage(props: Props) {
    const { id } = props;
    let hotel = getHotel(id);
    return (
        <div>
            <HotelInfoCard {...hotel.info} />
            <HotelReviewsBlock hotelId={id} />
        </div>
    );
}
