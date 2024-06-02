import { useEffect, useState } from "react";

import {
    hotelThunks,
    roomThunks,
    useAppDispatch,
    useAppSelector,
    userThunks,
} from "../../../store/store";
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
import type {
    RoomCategory,
    Booking,
    BookingStatus,
    Address,
} from "samolet-common";
import { Category } from "@mui/icons-material";

export interface BookingProps {
    idroom?: string;
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
    const booking = reservations.value || [];
    const activeBooking: Booking[] =
        booking.filter(
            booking =>
                booking.status === "not-paid" ||
                booking.status === "in-process",
        ) ?? [];
    const complitedBooking: Booking[] =
        booking.filter(
            booking =>
                booking.status === "finished" || booking.status === "paid",
        ) ?? [];

    //let complitedBooking: Booking[];
    console.log("брони");
    console.log(reservations.status);
    console.log(reservations.value);
    console.log("active");
    console.log(activeBooking);
    useEffect(() => {
        dispatch(userThunks.bookings({}));
        if (reservations.value) {
            console.log("active");
            console.log(activeBooking);
        }
    }, []);

    //let activeBooking = getActiveBooking();
    let activeBookingres;
    //let complitedBooking = getComplitedBooking();
    if (activeBooking.length) {
        activeBookingres = activeBooking.map(booking => (
            <BookingCard
                {...{
                    idhotel: booking.hotelId,
                    idroom: booking.roomId,
                    status: booking.status,
                    arrivalDate: booking.dateFrom,
                    departureDate: booking.dateTo,
                }}
            />
        ));
    }
    let complitedBookingres;
    if (complitedBooking.length) {
        complitedBookingres = complitedBooking.map(booking => (
            <BookingCard
                {...{
                    idhotel: booking.hotelId,
                    idroom: booking.roomId,
                    status: booking.status,
                    arrivalDate: booking.dateFrom,
                    departureDate: booking.dateTo,
                }}
            />
        ));
    }
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
export function formatAddress({ country, city, place }: Address) {
    return `${country} ${city} ${place}`;
}
function roomCategoryRoom(category: RoomCategory) {
    if (category == "bad") return RoomType.Economy;
    else if (category == "luxary") return RoomType.Standart;
    else return RoomType.Lux;
}
export function BookingCard(props: BookingProps) {
    const dispatch = useAppDispatch();
    const hotel = useAppSelector(state => state.requests.hotelById);

    const room = useAppSelector(state => state.requests.roomById);

    const title = hotel.value?.name ?? "";

    const address = hotel.value?.address
        ? formatAddress(hotel.value?.address)
        : "";
    const sum = room.value?.price ?? "0";
    const category = room.value?.category
        ? roomCategoryRoom(room.value?.category)
        : "";

    useEffect(() => {
        if (props.idhotel) {
            dispatch(hotelThunks.hotelById(props.idhotel));
        }
        if (props.idroom) {
            dispatch(roomThunks.roomById(props.idroom));
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
                <Title>{title}</Title>
                <TextStatus>Статус:</TextStatus>
                <TextStatusParam>{props.status}</TextStatusParam>
                <Button onClick={() => alert(alertText)}>{buttonText}</Button>
            </ContainerRow>
            <Block>
                <InfoContainer>
                    <InfoRow>
                        <Parameter>Адрес:</Parameter>{" "}
                        <BookingText>{address}</BookingText>
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
                        <BookingText>{category}</BookingText>
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

                    <Info title="Стоимость:" text={`${sum} Р`} />
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
