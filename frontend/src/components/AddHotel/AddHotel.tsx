import { useState } from "react";
import { useForm } from "react-hook-form";

import { type Room, type RoomCategory } from "samolet-common";
import { useAppDispatch } from "../../store/store";
import { createHotelThunk } from "../../store/requestThunks";
import {
    Container,
    LeftContainer,
    RightContainer,
    RowContainer,
    H2PrimaryColor,
    TextField,
    InputButton,
    CustomSelect,
} from "./style";

interface HotelInputs {
    name: string;
    description: string;
    photos: string[];
    country: string;
    city: string;
    place: string;
}

interface RoomInputs {
    roomCategory: string;
    price: number;
    bedAmount: number;
    facilities: string;
    amountOfRooms: number;
}

interface ReviewInputs {
    userId: string;
    title: string;
    content: string;
    mark: number;
    photos: string[];
}

export function AddHotel() {
    const dispatch = useAppDispatch();
    const [room, setRoom] = useState({} as Partial<Room>);
    const {
        register,
        handleSubmit,
        getValues: formValues,
    } = useForm<HotelInputs>();
    const roomTypes: RoomCategory[] = ["luxary", "normal", "bad"];
    const roomSelect = roomTypes.map(item => (
        <option key={item}>{item}</option>
    ));

    const { register: registerRoom, handleSubmit: handleRoomSubmit } =
        useForm<RoomInputs>();
    const {
        register: registerReview,
        handleSubmit: handleReviewSubmit,
        control,
    } = useForm<ReviewInputs>();
    const onHotelSubmit = (data: HotelInputs) => {
        dispatch(
            createHotelThunk({
                name: data.name,
                description: data.description,
                address: {
                    country: data.country,
                    city: data.city,
                    place: data.place,
                },
                rooms: [room],
            }),
        );
    };
    const onReviewSubmit = (data: ReviewInputs) => {
        alert(
            data.userId +
                " " +
                data.title +
                " " +
                data.content +
                " " +
                data.mark +
                " " +
                data.photos.length,
        );
    };
    const onRoomSubmit = (data: RoomInputs) => {
        setRoom({
            category: "normal",
            price: +data.price,
            bedAmount: +data.bedAmount,
            number: +data.price,
        });
        console.log(
            `
            ${data.roomCategory}
            ${data.price}
            ${data.bedAmount}
            ${data.amountOfRooms}
            `,
        );
    };
    return (
        <Container>
            <LeftContainer>
                <form onSubmit={handleSubmit(onHotelSubmit)}>
                    <RowContainer>
                        <H2PrimaryColor>Название отеля:</H2PrimaryColor>
                        <TextField type="textarea" {...register("name")} />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Описание:</H2PrimaryColor>
                        <TextField
                            type="textarea"
                            {...register("description")}
                        />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Страна:</H2PrimaryColor>
                        <TextField type="textarea" {...register("country")} />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Город:</H2PrimaryColor>
                        <TextField type="textarea" {...register("city")} />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Место:</H2PrimaryColor>
                        <TextField type="textarea" {...register("place")} />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Добавить фото отеля:</H2PrimaryColor>
                        <InputButton
                            type="file"
                            {...register("photos")}
                            multiple
                        />
                    </RowContainer>
                    <InputButton type="submit" />
                </form>
            </LeftContainer>

            <RightContainer>
                <form onSubmit={handleReviewSubmit(onReviewSubmit)}>
                    <H2PrimaryColor>Добавление отзыва</H2PrimaryColor>
                    <RowContainer>
                        <H2PrimaryColor>ID пользователя:</H2PrimaryColor>
                        <TextField
                            type="textare"
                            {...registerReview("userId")}
                        />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Название:</H2PrimaryColor>
                        <TextField
                            type="textare"
                            {...registerReview("title")}
                        />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Текст:</H2PrimaryColor>
                        <TextField
                            type="textare"
                            {...registerReview("content")}
                        />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Оценка:</H2PrimaryColor>
                        <input
                            {...registerReview("mark")}
                            min="0"
                            max="10"
                            step="0.5"
                            type="range"
                        />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Добавить фото отзыва:</H2PrimaryColor>
                        <InputButton
                            type="file"
                            multiple
                            {...registerReview("photos")}
                        />
                    </RowContainer>
                    <InputButton type="submit" />
                </form>
            </RightContainer>
            <RightContainer>
                <form onSubmit={handleRoomSubmit(onRoomSubmit)}>
                    <H2PrimaryColor>Добавление комнат</H2PrimaryColor>
                    <RowContainer>
                        <H2PrimaryColor>Тип комнаты:</H2PrimaryColor>
                        <CustomSelect {...registerRoom("roomCategory")}>
                            <option value="" selected disabled hidden>
                                --
                            </option>
                            {roomSelect}
                        </CustomSelect>
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Цена:</H2PrimaryColor>
                        <TextField type="textare" {...registerRoom("price")} />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Кол-во кроватей:</H2PrimaryColor>
                        <TextField
                            type="textare"
                            {...registerRoom("bedAmount")}
                        />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Количество комнат:</H2PrimaryColor>
                        <TextField
                            type="textare"
                            {...registerRoom("amountOfRooms")}
                        />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Удобства:</H2PrimaryColor>
                        <TextField
                            type="textare"
                            {...registerRoom("facilities")}
                        />
                    </RowContainer>
                    <InputButton type="submit" />
                </form>
            </RightContainer>
        </Container>
    );
}
