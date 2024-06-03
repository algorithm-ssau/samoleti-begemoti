import { purple } from "@mui/material/colors";
import { IcoMui } from "../Hotel/style";
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
import { Add, StarRate } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export interface ClientImg {
    src: string;
    alt: string;
}
export interface ReviewProps {
    hotelId: string;
    reviewId: string;
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
                    <StarRate sx={{ fontSize: 40, color: purple["A200"] }} />
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
    hotelId: string;
}
export function HotelReviewsBlock(props: HotelProps) {
    let reviews = getReviews(Number(props.hotelId));
    let resreviews = reviews.map(aReview => <HotelReviewCard {...aReview} />);
    return (
        <Container>
            <HeaderRow>
                <HSecondary>Отзывы</HSecondary>
                <AddRating>
                    Добавить отзыв
                    <IconButton
                        size="large"
                        onClick={() =>
                            alert("Здесь будет окно добавления отзыва!")
                        }
                    >
                        <Add sx={{ fontSize: 40 }} />
                    </IconButton>
                </AddRating>
            </HeaderRow>
            {resreviews}
        </Container>
    );
}
