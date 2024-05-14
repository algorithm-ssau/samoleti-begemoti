import { ContainerChapter, Line, Text } from "../Cash/style";
import {
    RoomType,
    Status,
    getActiveBooking,
    getComplitedBooking,
} from "./dataBooking";
import {
    Block,
    Container,
    ContainerRow,
    InfoContainer,
    InfoRow,
    Title,
    CommentBlock,
    Parameter,
    BookingText,
    CommentText,
    Button,
    TextStatus,
    TextStatusParam,
} from "./style";

export interface BookingProps {
    id: number;
    title: string;
    status: Status;
    address: string;
    telephone: number;
    visitorsNumber: number;
    roomType: RoomType;
    visitirContact: string;
    arrivalDate: Date;
    departureDate: Date;
    comment: string;
    sum: number;
}

export function Booking() {
    let activeBooking = getActiveBooking();
    let complitedBooking = getComplitedBooking();
    let activeBookingres = activeBooking.map(booking => (
        <BookingCard {...booking} />
    ));
    let complitedBookingres = complitedBooking.map(booking => (
        <BookingCard {...booking} />
    ));
    return (
        <div>
            <div>
                <ContainerChapter>
                    <Text>Активные</Text>
                    <Line />
                </ContainerChapter>
                {activeBookingres}
            </div>
            <div>
                <ContainerChapter>
                    <Text>Завершенные</Text>
                    <Line />
                </ContainerChapter>
                {complitedBookingres}
            </div>
        </div>
    );
}
export function onButtonClick(string: string) {
    return alert(string);
}
export function BookingCard(props: BookingProps) {
    let alertText = "";
    let buttonText = "";
    if (props.status === Status.PaidFor) {
        alertText = "Отмена брони";
        buttonText = "Отменить";
    } else if (props.status === Status.NotPaidFor) {
        alertText = "Оплата";
        buttonText = "Оплатить";
    } else if (props.status === Status.Complited) {
        alertText = "Оставить отзыв";
        buttonText = "Оставить отзыв";
    } else {
        alertText = "Возобновление брони";
        buttonText = "Забронировать";
    }
    return (
        <Container>
            <ContainerRow>
                <Title>{props.title}</Title>
                <TextStatus>Статус:</TextStatus>
                <TextStatusParam>{props.status}</TextStatusParam>
                <Button onClick={() => alert(alertText)}>{buttonText}</Button>
            </ContainerRow>
            <Block>
                <InfoContainer>
                    <InfoRow>
                        <Parameter>Адрес:</Parameter>{" "}
                        <BookingText>{props.address}</BookingText>
                    </InfoRow>
                    <InfoRow>
                        <Parameter>Телефон:</Parameter>{" "}
                        <BookingText>{props.telephone}</BookingText>
                    </InfoRow>
                    <InfoRow>
                        <Parameter>Номер бронирования:</Parameter>
                        <BookingText>{props.id}</BookingText>
                    </InfoRow>
                    <InfoRow>
                        <Parameter>Количество гостей:</Parameter>
                        <BookingText>{props.visitorsNumber}</BookingText>
                    </InfoRow>
                    <InfoRow>
                        <Parameter>Тип комнаты:</Parameter>
                        <BookingText>{props.roomType}</BookingText>
                    </InfoRow>
                    <InfoRow>
                        <Parameter>Контакты заказчика:</Parameter>
                        <BookingText>{props.visitirContact}</BookingText>
                    </InfoRow>
                </InfoContainer>
                <InfoContainer>
                    <InfoRow>
                        <Parameter>Дата заезда:</Parameter>
                        <BookingText>
                            {props.arrivalDate.toLocaleString()}
                        </BookingText>
                    </InfoRow>
                    <InfoRow>
                        <Parameter>Дата выезда:</Parameter>
                        <BookingText>
                            {props.departureDate.toLocaleString()}
                        </BookingText>
                    </InfoRow>
                    <CommentBlock>
                        <Parameter>Комментарий: </Parameter>{" "}
                        <CommentText>{props.comment}</CommentText>
                    </CommentBlock>

                    <Info title="Стоимость:" text={`${props.sum} Р`} />
                </InfoContainer>
            </Block>
        </Container>
    );
}

interface Props {
    title: string;
    text: string;
}

export function Info(props: Props) {
    const { title, text } = props;
    return (
        <InfoRow>
            <Parameter>{title}</Parameter>
            <BookingText>{text}</BookingText>
        </InfoRow>
    );
}
