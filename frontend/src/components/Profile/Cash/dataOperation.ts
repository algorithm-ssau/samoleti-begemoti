import type { OperationProps } from "./Cash";
export function getOperations( ):OperationProps[]{
    return operations;
}

export let operations: OperationProps[]=[
    {   title: 'Пополнение',
        sign: '+',
        sum: 2000
    },
    {   title: 'Бронь Отеля',
        sign: '-',
        sum: 3000
    },
    {   title: 'Покупка билетов',
        sign: '-',
        sum: 2000
    },
    {   title: 'Пополнение',
        sign: '+',
        sum: 5000
    }
]