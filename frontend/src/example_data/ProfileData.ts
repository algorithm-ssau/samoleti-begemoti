import type { OperationProps } from "../components/Profile/Cash/Cash";
import { operations } from "../components/Profile/Cash/dataOperation";
import { type User } from "samolet-common";

export let users: User[] = [
    {
        info: {
            surname: "",
            name: "",
            cardNumber: 2222222,
            passport: {
                serial: 1212,
                number: 22222,
                emitent: "",
            },
        },
        email: "a",
        passwordHash: "a",
        reviews: [],
        account: {
            amount: BigInt(100000),
            transactions: [],
        },
        hotelHistory: [],
    },
    {
        info: {
            surname: "Я",
            name: "Здесь",
            cardNumber: 2222222,
            passport: {
                serial: 1212,
                number: 22222,
                emitent: "",
            },
        },
        email: "a",
        passwordHash: "a",
        reviews: [],
        account: {
            amount: BigInt(100000),
            transactions: [],
        },
        hotelHistory: [],
    },
];
