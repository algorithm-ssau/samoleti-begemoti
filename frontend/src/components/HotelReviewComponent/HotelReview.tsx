import { getReviews } from "./dataReviews";
import {
    AddRating,
    CommentReview,
    Container,
    Content,
    HSecondary,
    HeaderRow,
    HeaderRowReview,
    Ico2,
    Photo,
    Plus,
    ReviewContainer,
    ReviewTextContainer,
} from "./style";

export interface ClientImg {
    src: string;
    alt: string;
}
export interface ReviewProps {
    hotelId: number;
    reviewId: number;
    rating: number;
    pluses: string;
    minuses: string;
    clientImgs: ClientImg;
}
export function HotelReviewCard(props: ReviewProps) {
    return (
        <ReviewContainer>
            <ReviewTextContainer>
                <HeaderRowReview>
                    <AddRating>{props.rating}</AddRating>
                    <Ico2
                        //src={StarIcon}
                        src="star.ico"
                        alt="Star"
                    />
                </HeaderRowReview>
                <div>
                    <CommentReview>Понравилось:</CommentReview>
                    <Content>{props.pluses}</Content>
                    <CommentReview>Не понравилось:</CommentReview>
                    <Content>{props.minuses}</Content>
                </div>
            </ReviewTextContainer>
            <Photo src={props.clientImgs.src} alt={props.clientImgs.alt} />
        </ReviewContainer>
    );
}
interface HotelProps {
    hotelId: number;
}
export function HotelReviewsBlock(props: HotelProps) {
    let reviews = getReviews(props.hotelId);
    let resreviews = reviews.map(aReview => <HotelReviewCard {...aReview} />);
    return (
        <Container>
            <HeaderRow>
                <HSecondary>Отзывы</HSecondary>
                <AddRating>Добавить отзыв</AddRating>
                <Plus
                    src="pluse.ico"
                    alt="плюс"
                    onClick={() => alert("Здесь будет окно добавления отзыва!")}
                />
            </HeaderRow>
            {resreviews}
        </Container>
    );
}
