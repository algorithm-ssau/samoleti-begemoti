import { Booking, Photo, SomeTransaction } from "./db_types";

export interface User {
    email: string;
    passwordHash: string;
    info: Partial<PersonalInfo>;
    reviews: Review[];
    account: BankAccount;
    hotelHistory: Booking[];
}

export interface BankAccount {
    amount: BigInt;
    transactions: AccountTransaction[];
}

export interface AccountTransaction {
    user: User;
    date: Date;
    amount: BigInt;
    description: string;
}

export interface PersonalInfo {
    name: string;
    surname: string;
    patronim: string;
    cardNumber: number;
    passport: Passport;
}

export interface Passport {
    serial: number;
    number: number;
    emitent: string;
}

export interface UserForReview {
    profilePicture: Photo;
    name: string;
}

export interface Review {
    user: UserForReview;
    topText: string;
    bottomText: string;
    rating: number;
    photos: Photo[];
}

export interface NewReview {
    topText: string;
    bottomText: string;
    photos: Photo[];
    rating: number;
}
