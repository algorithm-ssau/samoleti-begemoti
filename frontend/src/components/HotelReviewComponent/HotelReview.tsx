
import { getReviews } from "./dataReviews"
import { AddR, CommentRev, Container, Content, HSecondary, HeaderRow, HeaderRowReview, Ico2, Photo, Pl, ReviewContainer, ReviewTextContainer} from "./style"

export interface ClientImg{
    src: string,
    alt: string
}
export interface ReviewProps{
    hotelId: number,
    reviewId: number,
    rating: number,
    pluses: string,
    minuses: string,
    clientImgs: ClientImg
}
export function HotelReviewCard(props: ReviewProps ){
    return(
        <ReviewContainer>
            <ReviewTextContainer>
                <HeaderRowReview>
                    <AddR>{props.rating}</AddR>
                    <Ico2
                    //src={StarIcon}
                    src='star.ico'
                    alt='Star'
                    />
                </HeaderRowReview>
                <div>
                    <CommentRev>Понравилось:</CommentRev>
                    <Content>{props.pluses}</Content>
                    <CommentRev>Не понравилось:</CommentRev>
                    <Content>{props.minuses}</Content>
                </div>
            </ReviewTextContainer>
            <Photo
                src = {props.clientImgs.src}
                alt = {props.clientImgs.alt}
                />
        </ReviewContainer>
    )
}
interface HotelProps{
    hotelId: number
}
export function HotelReviewsBlock(props: HotelProps){
     let reviews = getReviews(props.hotelId);
    let resreviews = reviews.map((aReview)=>(
         <HotelReviewCard {...aReview}/>            
     ));
    return <Container>
        <HeaderRow>
            <HSecondary>Отзывы</HSecondary>
            <AddR>Добавить отзыв</AddR>
            <Pl 
                src='pluse.ico'
                alt="плюс"
                onClick={()=>alert("Здесь будет окно добавления отзыва!")}
            /> 
        </HeaderRow>      
        {resreviews}
    </Container>
}

 