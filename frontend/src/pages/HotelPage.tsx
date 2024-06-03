import { getHotel } from "../util/util";
import { HotelInfoCard } from "../components/Hotel/Hotel";
import { HotelReviewsBlock } from "../components/HotelReviewComponent/HotelReview";
import HotelRoom from "../components/HotelRoom";
import { useParams } from "react-router";

interface RouteParams {
    id: string;
}

export function HotelPage() {
    const { id } = useParams<keyof RouteParams>() as RouteParams;

    if (id == null) {
        return (
            <div>
                <p>can't display hotel page without hotel id.</p>
                <p>This page requires ':id' path parameter</p>
            </div>
        );
    }

    let hotel = getHotel(id);

    return (
        <div>
            <HotelInfoCard {...hotel.info} />
            <HotelRoom />
            <HotelReviewsBlock hotelId={id} />
        </div>
    );
}
