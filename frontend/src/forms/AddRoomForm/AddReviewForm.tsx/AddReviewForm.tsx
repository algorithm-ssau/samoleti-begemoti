import { TextField } from "@mui/material";
import {
    H2PrimaryColor,
    RowContainer,
    InputButton,
} from "../../../components/AddHotel/style";
import { SliderHook } from "../../../components/SliderHook";
import type { Control, UseFormRegister } from "react-hook-form";

export type ReviewFormState = {
    userId: string;
    title: string;
    content: string;
    mark: number;
    photos: string[];
};

interface Props {
    register: UseFormRegister<ReviewFormState>;
    control: Control<any>;
    namePrefix: string;
}

export function AddReviewForm(props: Props) {
    const { register, control, namePrefix } = props;
    return (
        <>
            <H2PrimaryColor>Добавление отзыва</H2PrimaryColor>
            <RowContainer>
                <H2PrimaryColor>ID пользователя:</H2PrimaryColor>
                <TextField type="textare" {...register("userId")} />
            </RowContainer>
            <RowContainer>
                <H2PrimaryColor>Название:</H2PrimaryColor>
                <TextField type="textare" {...register("title")} />
            </RowContainer>
            <RowContainer>
                <H2PrimaryColor>Текст:</H2PrimaryColor>
                <TextField type="textare" {...register("content")} />
            </RowContainer>
            <RowContainer>
                <H2PrimaryColor>Оценка:</H2PrimaryColor>
                {/* {reviewFormValues.mark ?? 5} */}
                <SliderHook
                    control={control}
                    namePrefix={namePrefix}
                    name="mark"
                    min={0}
                    max={10}
                    step={0.5}
                />
            </RowContainer>
            <RowContainer>
                <H2PrimaryColor>Добавить фото отзыва:</H2PrimaryColor>
                <InputButton type="file" multiple {...register("photos")} />
            </RowContainer>
            <InputButton type="submit" />
        </>
    );
}
