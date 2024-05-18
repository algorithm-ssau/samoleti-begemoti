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

function HotelCard() {
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
    const { register: registerroom, handleSubmit: handleroomSubmit } =
        useForm<RoomInputs>();
    const { register: registerreview, handleSubmit: handlereviewSubmit } =
        useForm<ReviewInputs>();
    const handleHotelSubmit = (data: HotelInputs) => {
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
    const handleReviewSubmit = (data: ReviewInputs) => {
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
    const handleRoomSubmit = (data: RoomInputs) => {
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
                <form onSubmit={handleSubmit(handleHotelSubmit)}>
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
                <form onSubmit={handlereviewSubmit(handleReviewSubmit)}>
                    <H2PrimaryColor>Добавление отзыва</H2PrimaryColor>
                    <RowContainer>
                        <H2PrimaryColor>ID пользователя:</H2PrimaryColor>
                        <TextField
                            type="textare"
                            {...registerreview("userId")}
                        />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Название:</H2PrimaryColor>
                        <TextField
                            type="textare"
                            {...registerreview("title")}
                        />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Текст:</H2PrimaryColor>
                        <TextField
                            type="textare"
                            {...registerreview("content")}
                        />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Оценка:</H2PrimaryColor>
                        <CustomSelect {...registerreview("mark")}>
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
                            {...registerreview("photos")}
                        />
                    </RowContainer>
                    <InputButton type="submit" />
                </form>
            </RightContainer>
            <RightContainer>
                <form onSubmit={handleroomSubmit(handleRoomSubmit)}>
                    <H2PrimaryColor>Добавление комнат</H2PrimaryColor>
                    <RowContainer>
                        <H2PrimaryColor>Тип комнаты:</H2PrimaryColor>
                        <CustomSelect {...registerroom("roomCategory")}>
                            <option value="" selected disabled hidden>
                                --
                            </option>
                            {roomSelect}
                        </CustomSelect>
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Цена:</H2PrimaryColor>
                        <TextField type="textare" {...registerroom("price")} />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Кол-во кроватей:</H2PrimaryColor>
                        <TextField
                            type="textare"
                            {...registerroom("bedAmount")}
                        />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Количество комнат:</H2PrimaryColor>
                        <TextField
                            type="textare"
                            {...registerroom("amountOfRooms")}
                        />
                    </RowContainer>
                    <RowContainer>
                        <H2PrimaryColor>Удобства:</H2PrimaryColor>
                        <TextField
                            type="textare"
                            {...registerroom("facilities")}
                        />
                    </RowContainer>
                    <InputButton type="submit" />
                </form>
            </RightContainer>
        </Container>
    );
}

export default HotelCard;
