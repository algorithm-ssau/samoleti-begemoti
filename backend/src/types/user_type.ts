import { HotelBooking, Photo, SomeTransaction } from "./db_types";

export interface User {
    id: number;
    passwordHash: string;
    info: PersonalInfo;
    reviews: Review[];
    account: BankAccount;
    hotelHistory: HotelBooking[];
}

export interface BankAccount {
    amount: BigInt;
    transactions: AccountTransaction[];
}

export interface AccountTransaction {
    user: User;
    date: Date;
    amount: BigInt;
    description: SomeTransaction;
}

export interface PersonalInfo {
    name: string;
    surname: string;
    passport: Passport;
}

export interface Passport {
    serial: number;
    number: number;
}

export interface Review {
    user: User;
    title: string;
    content: string;
    mark: number;
    photos: Photo[];
}
