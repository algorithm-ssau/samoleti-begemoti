import { useEffect } from "react";
import {
    bookThunk,
    bookingsThunk,
    hotelByIdThunk,
    roomByIdThunk,
} from "../../../store/requestThunks";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { ContainerChapter, Line, Text } from "../Cash/style";
import {
    RoomType,
    Status,
    //getActiveBooking,
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
import { RoomCategory, type Booking, type BookingStatus } from "samolet-common";

export interface BookingProps {
    idroom?: number;
    idhotel?: string;
    title?: string;
    status?: BookingStatus;
    address?: string;
    telephone?: number;
    visitorsNumber?: number;
    roomType?: RoomType;
    visitirContact?: string;
    arrivalDate: Date;
    departureDate: Date;
    comment?: string;
    sum?: number;
}

export function Booking() {
    const dispatch = useAppDispatch();
    const reservations = useAppSelector(state => state.requests.bookings);
    let activeBooking: Booking[] = [];
    const book = useAppSelector(state => state.requests.book);
    // useEffect(() => {
    //     dispatch(
    //         bookThunk({
    //             dateFrom: Number(new Date()),
    //             dateTo: Number(new Date()),
    //             hotelId: "1'",
    //             roomId: "1",
    //             sum: 1000,
    //             comment: "ляляял",
    //             visitorsNumber: 1,
    //         }),
    //     );
    // }, []);
    //props.visitorsNumber = 1;
    console.log("status book" + book.status);
    //let complitedBooking: Booking[];
    console.log("брони");
    console.log(reservations.status);
    console.log(reservations.value);
    useEffect(() => {
        dispatch(bookingsThunk());
        if (reservations.value) {
            activeBooking = reservations.value;
            // console.log("брони");
            // console.log(reservations.status);
            // console.log(reservations.value);
            // .filter(
            //     booking =>
            //         booking.status === "not-paid" ||
            //         booking.status === "in-process",
            // );
            let complitedBooking = reservations.value.filter(
                booking =>
                    booking.status === "finished" || booking.status === "paid",
            );
            console.log(activeBooking);
        }
    }, []);

    //let activeBooking = getActiveBooking();
    let activeBookingres;
    let complitedBooking = getComplitedBooking();
    if (activeBooking.length) {
        activeBookingres = activeBooking.map(booking => (
            <BookingCard
                {...{
                    idhotel: booking.hotelId,
                    idroom: Number(booking.roomId),
                    status: booking.status,
                    arrivalDate: booking.dateFrom,
                    departureDate: booking.dateTo,
                }}
            />
        ));
    } //...booking

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
    const dispatch = useAppDispatch();
    const hotel = useAppSelector(state => state.requests.hotelById);
    const room = useAppSelector(state => state.requests.roomById);
    useEffect(() => {
        if (props.idhotel) {
            dispatch(hotelByIdThunk({ id: props.idhotel }));
            if (hotel.status === "fulfilled") {
                if (hotel.value?.name) props.title = hotel.value?.name;
                if (hotel.value?.address)
                    props.address =
                        hotel.value?.address.country +
                        " " +
                        hotel.value.address.city +
                        " " +
                        hotel.value.address.place;
            }
        }
        if (props.idroom) {
            dispatch(roomByIdThunk({ id: Number(props.idroom) }));
            if (room.status === "fulfilled") {
                if (room.value.price) props.sum = room.value.price * 1; //props.visitorsNumber!;
                if (room.value.category) {
                    if (room.value.category == RoomCategory.Shit)
                        props.roomType = RoomType.Economy;
                    else if (room.value.category == RoomCategory.Normal)
                        props.roomType = RoomType.Standart;
                    else props.roomType = RoomType.Lux;
                }
            }
        }
    }, []);
    let alertText = "";
    let buttonText = "";
    if (props.status === "paid") {
        alertText = "Отмена брони";
        buttonText = "Отменить";
    } else if (props.status === "not-paid") {
        alertText = "Оплата";
        buttonText = "Оплатить";
    } else if (props.status === "finished") {
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
                        <BookingText>{props.idroom}</BookingText>
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
