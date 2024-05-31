import { useState } from "react";
import { getOperations } from "./dataOperation";
import {
    Balance,
    Close,
    Container,
    ContainerChapter,
    ContainerRow,
    DialogContainer,
    DialogReplenish,
    Line,
    Money,
    OperationContaner,
    OperationElement,
    Replenish,
    Text,
} from "./style";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import { FormRow } from "../../Auth/Registration/Registration";
type InputEvent = React.ChangeEvent<HTMLInputElement>;
export interface OperationProps {
    title: string;
    sign: string | undefined;
    sum: number;
}

export function Operation(props: OperationProps) {
    return (
        <OperationContaner>
            <OperationElement>{props.title}</OperationElement>
            <OperationElement>
                {props.sign}
                {props.sum}
            </OperationElement>
        </OperationContaner>
    );
}
interface CashProps {
    money: number;
    //
}
export function Cash(props: CashProps) {
    let operations = getOperations().map(operation => (
        <Operation {...operation} />
    ));
    const [sum, setSum] = useState(0);
    const [open, setOpen] = useState(false);
    const handlSumChange = (e: InputEvent) => {
        setSum(Number(e.target.value));
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Container>
                <ContainerRow>
                    <Balance>Баланс</Balance>
                    <Money>{props.money} Р</Money>
                    <Replenish onClick={handleClickOpen}>Пополнить</Replenish>
                </ContainerRow>
                <ContainerChapter>
                    <Text>История платежей</Text>
                    <Line />
                </ContainerChapter>
                {operations}
            </Container>
            <Dialog open={open} onClose={handleClose} sx={{ p: 2 }}>
                <DialogContainer>
                    <Close onClick={handleClose}>
                        <CloseIcon />
                    </Close>
                    <FormRow
                        name="Пополнить на сумму:"
                        value={sum.toString()}
                        placeHolder="0"
                        type="number"
                        id="sum"
                        onChange={handlSumChange}
                    />
                </DialogContainer>
                <DialogReplenish onClick={() => replenish(sum, props.money)}>
                    Пополнить
                </DialogReplenish>
            </Dialog>
        </>
    );
}
function replenish(add: number, money: number) {
    console.log(add + money);
}
