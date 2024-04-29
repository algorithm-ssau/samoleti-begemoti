import { getOperations } from "./dataOperation";
import {
    Balans,
    Container,
    ContainerChapter,
    ContainerRow,
    Hr,
    Money,
    OperationContaner,
    OperationElement,
    Replenish,
    Text,
} from "./style";

export interface OperationProps {
    title: string;
    sign: string;
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
    let operations = getOperations();
    let operationsres = operations.map((operation) => (
        <Operation {...operation} />
    ));
    return (
        <Container>
            <ContainerRow>
                <Balans>Баланс</Balans>
                <Money>{props.money} Р</Money>
                <Replenish
                    onClick={() => alert("Здесь будет окно пополнения счета!")}
                >
                    Пополнить
                </Replenish>
            </ContainerRow>
            <ContainerChapter>
                <Text>История платежей</Text>
                <Hr />
            </ContainerChapter>
            {operationsres}
        </Container>
    );
}
