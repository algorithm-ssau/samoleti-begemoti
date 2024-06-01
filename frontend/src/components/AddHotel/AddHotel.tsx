import { useForm } from "react-hook-form";
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
import { useAppDispatch, useAppSelector } from "../../store/store";
import { creatHotelThunk, creatRoomThunk } from "../../store/requestThunks";
import { RoomCategoryNetwork } from "samolet-common/src/network/roomCategory";
import { RoomCategory, type Room } from "samolet-common";
import { useState } from "react";

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
    const addoteHl = useAppSelector(state => state.requests.creatHotel);
    const roomTypes = ["Luxary", "Normal", "Hell"];
    const roomSelect = roomTypes.map(item => (
        <option key={item}>{item}</option>
    ));
    const rateList = [
        0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9,
        9.5, 10,
    ];
    const rating = rateList.map(item => <option key={item}>{item}</option>);
    const { register, handleSubmit } = useForm<HotelInputs>();
    const { register: registerRoom, handleSubmit: handleRoomSubmit } =
        useForm<RoomInputs>();
    const { register: registerReview, handleSubmit: handleReviewSubmit } =
        useForm<ReviewInputs>();
    const [room, setRoom] = useState({} as Room);
    const onHotelSubmit = (data: HotelInputs) => {
        dispatch(
            creatHotelThunk({
                name: data.name,
                description: data.description,
                photos: [], ////должны быть фото
                address: {
                    country: data.country,
                    city: data.city,
                    place: data.place,
                },
                rooms: [room],
                reviews: [],
            }),
        );
        alert(
            data.name +
                " " +
                data.description +
                " " +
                data.country +
                " " +
                data.city +
                " " +
                data.place +
                " " +
                data.photos.length,
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
        dispatch(
            creatRoomThunk({
                category: RoomCategory.Normal, //data.roomCategory,//типы разные
                price: data.price,
                bedAmount: data.bedAmount,
                facilities: [{ name: data.facilities }],
                number: data.price, //номер в форму добавить
            }),
        );
        setRoom({
            category: RoomCategory.Normal, //data.roomCategory,//типы разные
            price: data.price,
            bedAmount: data.bedAmount,
            facilities: [{ name: data.facilities }],
            number: data.price,
        });
        alert(
            data.roomCategory +
                " " +
                data.price +
                " " +
                data.bedAmount +
                " " +
                data.amountOfRooms +
                " " +
                data.facilities,
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
                        <CustomSelect {...registerReview("mark")}>
                            <option value="" selected disabled hidden>
                                --
                            </option>
                            {rating}
                        </CustomSelect>
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
