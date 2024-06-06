import { Input } from "@mui/base";
import {
    Table,
    Select,
    TableRow,
    TableCell,
    MenuItem,
    TableBody,
} from "@mui/material";
import {
    type UseFormRegister,
    type UseFormRegisterReturn,
} from "react-hook-form";
import { H2PrimaryColor } from "../../components/AddHotel/style";
import type { HotelFormState } from "../../components/AddHotel/AddHotel";

export type RoomFormState = {
    roomCategory: string;
    price: string;
    bedAmount: string;
    facilities: string;
    amountOfRooms: string;
    photos: string;
};

export const defaultRoomFormState: RoomFormState = {
    roomCategory: "",
    price: "1",
    bedAmount: "0",
    facilities: "",
    amountOfRooms: "0",
    photos: "",
};

interface Props {
    register: UseFormRegister<RoomFormState>;
    rawRegister: UseFormRegister<HotelFormState>;
    form?: HotelFormState;
    index: number;
}

export function AddRoomForm(props: Props) {
    const { register, rawRegister, index } = props;

    const roomSelect = ["luxary", "normal", "bad"].map(item => (
        <MenuItem value={item} key={item}>
            {item}
        </MenuItem>
    ));

    return (
        <>
            {JSON.stringify(props.form)}
            <Table>
                <TableBody>
                    <GenericInputRow
                        title="Категория"
                        element={
                            <Select {...register("roomCategory")}>
                                {roomSelect}
                            </Select>
                        }
                    ></GenericInputRow>
                    <TableRow>
                        <TableCell>
                            price
                            <input {...rawRegister(`rooms.${index}.price`)} />
                            <InputRow
                                title={"Цена:"}
                                register={register("price")}
                            />
                        </TableCell>
                    </TableRow>
                    <InputRow
                        title={"Кол-во кроватей:"}
                        register={register("bedAmount")}
                    />
                    <InputRow
                        title={"Количество комнат"}
                        register={register("amountOfRooms")}
                    />
                    <InputRow
                        title="Удобства"
                        register={register("facilities")}
                    />
                    <InputRow title="Фото" register={register("photos")} />
                </TableBody>
            </Table>
        </>
    );
}

type InputRowProps = {
    title: string;
    register: UseFormRegisterReturn<any>;
};

function InputRow(props: InputRowProps) {
    const { title, register } = props;

    return (
        <>
            <TableRow>
                <TableCell>
                    <H2PrimaryColor>{title}</H2PrimaryColor>
                </TableCell>
                <TableCell>
                    <Input {...register} />
                </TableCell>
            </TableRow>
        </>
    );
}

type GenericInputProps = {
    title: string;
    element: JSX.Element;
};

export function GenericInputRow(props: GenericInputProps) {
    const { title, element } = props;

    return (
        <>
            <TableRow>
                <TableCell>
                    <H2PrimaryColor>{title}</H2PrimaryColor>
                </TableCell>
                <TableCell>{element}</TableCell>
            </TableRow>
        </>
    );
}
