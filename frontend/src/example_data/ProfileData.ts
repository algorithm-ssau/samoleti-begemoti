export interface ProfileInfo {
    id: string;
    surname: string;
    name: string;
    cardNumber: string;
}
export interface User {
    id: string;
    profileInfo: ProfileInfo | undefined;
    login: string;
    password: string;
}
export let profileInfo: ProfileInfo[] = [
    {
        id: "0",
        surname: "",
        name: "",
        cardNumber: "3333 3333 3333",
    },
    {
        id: "1",
        surname: "Я",
        name: "Здесь",
        cardNumber: "4444 3333 3333",
    },
];
export let users: User[] = [
    {
        id: "0",
        profileInfo: profileInfo[0],
        login: "a",
        password: "a",
    },
    {
        id: "1",
        profileInfo: profileInfo[1],
        login: "a",
        password: "a",
    },
];
