export interface HotelInfoProps {
    name: string;
    isLuxary: boolean;
    isNormal: boolean;
    isReallyBad: boolean;
    city: string;
    country: string;
    place: string;
    hotelFood: boolean;
    hotelWiFi: boolean;
    rate: number;
    price: number;
}

export interface Filters {
    city: string;
    food: boolean;
    wifi: boolean;
    lowPrice: number;
    highPrice: number;
}

export const hotelInfo = [
    {
        name: "Звезда",
        isLuxary: false,
        isNormal: true,
        isReallyBad: false,
        city: "Vladivostok",
        country: "Russia",
        place: "Svetlanskaya, bld. 118, appt. 51",
        hotelFood: true,
        hotelWiFi: true,
        rate: 5,
        price: 2600,
    },

    {
        name: "Аврора",
        isLuxary: true,
        isNormal: true,
        isReallyBad: false,
        city: "Stavropol",
        country: "Russia",
        place: "Dzerzhinskogo Ul., bld. 139, appt. 12",
        hotelFood: false,
        hotelWiFi: false,
        rate: 7,
        price: 4000,
    },

    {
        name: "IRIS",
        isLuxary: true,
        isNormal: false,
        isReallyBad: true,
        city: "Washington",
        country: "USA",
        place: "1144 Hardman Road",
        hotelFood: false,
        hotelWiFi: true,
        rate: 6,
        price: 2300,
    },

    {
        name: "Galaxy",
        isLuxary: false,
        isNormal: true,
        isReallyBad: false,
        city: "Houston",
        country: "USA",
        place: "4275 Swick Hill Street",
        hotelFood: true,
        hotelWiFi: false,
        rate: 8,
        price: 3500,
    },

    {
        name: "Мечта",
        isLuxary: true,
        isNormal: true,
        isReallyBad: false,
        city: "Saint-Petersburg",
        country: "Russia",
        place: "Antonova-Ovseenko Ul., bld. 5/21, appt. 179",
        hotelFood: true,
        hotelWiFi: true,
        rate: 9,
        price: 4500,
    },
    {
        name: "Лагуна",
        isLuxary: false,
        isNormal: true,
        isReallyBad: false,
        city: "Stavropol",
        country: "Russia",
        place: "Prospekt Oktyabrya, bld. 48, appt. 35",
        hotelFood: false,
        hotelWiFi: true,
        rate: 6,
        price: 1700,
    },
    {
        name: "Sky&Stars",
        isLuxary: true,
        isNormal: true,
        isReallyBad: false,
        city: "Houston",
        country: "USA",
        place: "3715 Oakwood Avenue",
        hotelFood: true,
        hotelWiFi: true,
        rate: 8,
        price: 5500,
    },
];
