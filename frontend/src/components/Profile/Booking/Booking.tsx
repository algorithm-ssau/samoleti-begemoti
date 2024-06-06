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
import { network } from "../../../network";
import type { THotel } from "samolet-common/src/network/hotel";
import type { TRoom } from "samolet-common/src/network/room";
import { formatAddress } from "../../../util";

export interface BookingProps {
    idroom?: string;
    idhotel?: string;
    title?: string;
    status?: BookingStatus;
    address?: string;
    telephone?: number;
    visitorsNumber?: number;
    roomType?: RoomCategory;
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

function roomCategoryRoom(category: RoomCategory): string {
    switch (category) {
        case "bad":
            return "ну не очень";
        case "normal":
            return "пойдет";
        case "luxary":
            return "ну это конечно кринжатина";
    }
}
export function BookingCard(props: BookingProps) {
    const dispatch = useAppDispatch();

    const [hotel, setHotel] = useState<THotel | null>();
    const [room, setRoom] = useState<TRoom | null>();

    useEffect(() => {
        if (props.idhotel) {
            network.hotel
                .getById(props.idhotel)
                .then(_ => _.data)
                .then(setHotel);
        }
        if (props.idroom) {
            network.room
                .getById(props.idroom)
                .then(_ => _.data)
                .then(setRoom);
        }
    }, []);

    const title = hotel?.name ?? "";

    const address = hotel?.address ? formatAddress(hotel?.address) : "";
    const sum = room?.price ?? "0";
    const category = room?.category ? roomCategoryRoom(room?.category) : "";
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
