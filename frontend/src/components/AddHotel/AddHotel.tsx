import { useFieldArray, useForm } from "react-hook-form";

import { hotelThunks, useAppDispatch } from "../../store/store";
import {
    Container,
    LeftContainer,
    RightContainer,
    RowContainer,
    H2PrimaryColor,
    TextField,
    InputButton,
} from "./style";
import { Button } from "@mui/material";
import {
    AddRoomForm,
    defaultRoomFormState,
    type RoomFormState,
} from "../../forms/AddRoomForm/AddRoomForm";
import {
    AddReviewForm,
    type ReviewFormState,
} from "../../forms/AddRoomForm/AddReviewForm.tsx/AddReviewForm";
import type { Room } from "samolet-common";

interface HotelInputs {
    name: string;
    description: string;
    photos: string[];
    country: string;
    city: string;
    place: string;
}

export type HotelFormState = {
    rooms: RoomFormState[];
    reviews: ReviewFormState[];
} & HotelInputs;

function convertToApiType(room: RoomFormState) {
    const { amountOfRooms, bedAmount, facilities, price, roomCategory } = room;
    return {
        amountOfRooms: +amountOfRooms,
        bedAmount: +bedAmount,
        facilities: [],
        price: +price,
        roomCategory,
    };
}

export function AddHotel() {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, control, watch } =
        useForm<HotelFormState>();

    const { fields, remove, append } = useFieldArray({
        name: "rooms",
        control,
    });

    const form = watch();
    const {
        fields: reviews,
        remove: removeReview,
        append: appendReview,
    } = useFieldArray({
        name: "reviews",
        control,
    });
    // const {
    //     register: registerReview,
    //     handleSubmit: handleReviewSubmit,
    //     control,
    //     setValue: setFormValue,
    //     watch,
    // } = useForm<ReviewInputs>();

    // const reviewFormValues = watch();

    const onHotelSubmit = (data: HotelInputs) => {
        dispatch(
            hotelThunks.createHotel({
                name: data.name,
                description: data.description,
                address: {
                    country: data.country,
                    city: data.city,
                    place: data.place,
                },
                rooms: form.rooms.map(convertToApiType),
            }),
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
                {reviews.map(({}, index) => (
                    <AddReviewForm
                        control={control}
                        namePrefix={`reviews[${index}].`}
                        register={fieldName =>
                            register(`reviews[${index}].${fieldName}` as any)
                        }
                    />
                ))}
            </RightContainer>
            <RightContainer>
                {fields.map(({}, index) => (
                    <>
                        <AddRoomForm
                            rawRegister={register}
                            index={index}
                            form={form}
                            register={fieldName =>
                                register(`rooms[${index}].${fieldName}` as any)
                            }
                        />
                    </>
                ))}
            </RightContainer>
            <Button onClick={() => append(defaultRoomFormState)}>
                Add room
            </Button>
            <Button
                onClick={() =>
                    appendReview({
                        content: "",
                        mark: 0,
                        photos: [],
                        title: "",
                        userId: "",
                    })
                }
            >
                Add review
            </Button>
        </Container>
    );
}
