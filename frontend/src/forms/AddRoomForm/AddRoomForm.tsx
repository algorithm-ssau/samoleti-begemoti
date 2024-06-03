import { Input, MenuItem } from "@mui/base";
import { Table, Select, TableRow, TableCell } from "@mui/material";
import {
    type UseFormRegister,
    type UseFormRegisterReturn,
} from "react-hook-form";
import { H2PrimaryColor, InputButton } from "../../components/AddHotel/style";
import type { RoomCategory } from "samolet-common";

export type RoomFormState = {
    roomCategory: string;
    price: number;
    bedAmount: number;
    facilities: string;
    amountOfRooms: number;
};

export const defaultRoomFormState: RoomFormState = {
    roomCategory: "",
    price: 1,
    bedAmount: 0,
    facilities: "",
    amountOfRooms: 0,
};

interface Props {
    register: UseFormRegister<RoomFormState>;
}

export function AddRoomForm(props: Props) {
    const { register } = props;
    const roomTypes: RoomCategory[] = ["luxary", "normal", "bad"];
    const roomSelect = roomTypes.map(item => (
        <MenuItem value={item} key={item}>
            {item}
        </MenuItem>
    ));

    return (
        <Table>
            <GenericInputRow
                title="Категория"
                element={
                    <Select {...register("roomCategory")}>{roomSelect}</Select>
                }
            ></GenericInputRow>

            <InputRow title={"Цена:"} register={register("price")} />
            <InputRow
                title={"Кол-во кроватей:"}
                register={register("bedAmount")}
            />
            <InputRow
                title={"Количество комнат"}
                register={register("amountOfRooms")}
            />
            <InputRow title="Удобства" register={register("facilities")} />
        </Table>
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
