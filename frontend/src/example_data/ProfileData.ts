import type { OperationProps } from "../components/Profile/Cash/Cash";
import { operations } from "../components/Profile/Cash/dataOperation";
import { type User } from "samolet-common";

export let users: User[] = [
    {
        _id: "0",
        info: {
            surname: "",
            name: "",
            passport: {
                serial: 1212,
                number: 22222,
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
        _id: "1",
        info: {
            surname: "Я",
            name: "Здесь",
            passport: {
                serial: 1212,
                number: 22222,
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
