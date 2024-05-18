import { type BookingProps } from "./Booking";

export enum Status {
    Cancelled = "Отменено",
    Complited = "Завершено",
    PaidFor = "Оплачено",
    NotPaidFor = "Не оплачено",
}
export enum RoomType {
    Economy = "Эконом",
    Standart = "Стандарт",
    Lux = "Люкс",
}
export function getActiveBooking(): BookingProps[] {
    return booking.filter(
        aBooking =>
            aBooking.status === Status.NotPaidFor ||
            aBooking.status === Status.PaidFor,
    );
}
export function getComplitedBooking(): BookingProps[] {
    return booking.filter(
        aBooking =>
            aBooking.status === Status.Cancelled ||
            aBooking.status === Status.Complited,
    );
}
export let booking: BookingProps[] = [
    {
        id: 0,
        title: "Отель с очень длинным названием",
        status: Status.Cancelled,
        address: "46 Market Rd, Superior Bldg, Columbus, Ohio, 45993",
        telephone: 89372456435,
        visitorsNumber: 2,
        roomType: RoomType.Standart,
        visitirContact: "RhebaAbernathy@nowhere.com",
        arrivalDate: new Date(2020, 3, 2),
        departureDate: new Date(2020, 3, 12),
        comment:
            "To sort everything out, it is worth mentioning that the explicit" +
            " examination of sufficient amount should correlate with The Programming of Justificatory Development" +
            "Bryce Scoggins in The Book of the Significant Improvement",
        sum: 4000,
    },
    {
        id: 1,
        title: "Отель с названием по короче",
        status: Status.Complited,
        address: "49 Market Rd, Superior Bldg, Columbus, Ohio, 45993",
        telephone: 89372456435,
        visitorsNumber: 1,
        roomType: RoomType.Lux,
        visitirContact: "RhebaAbernathy@nowhere.com",
        arrivalDate: new Date(2024, 4, 2),
        departureDate: new Date(2024, 4, 12),
        comment:
            "To sort everything out, it is worth mentioning that the explicit" +
            " examination of sufficient amount should correlate with The Programming of Justificatory Development" +
            "Bryce Scoggins in The Book of the Significant Improvement" +
            "For instance, the influence of the relation between the direct access to key " +
            "resources and the internal network represents opportunities for the questionable thesis.  ",
        sum: 50000,
    },
    {
        id: 2,
        title: "Отель маленький",
        status: Status.NotPaidFor,
        address: "48 Market Rd, Superior Bldg, Columbus, Ohio, 45993",
        telephone: 89372456435,
        visitorsNumber: 1,
        roomType: RoomType.Economy,
        visitirContact: "RhebaAbernathy@nowhere.com",
        arrivalDate: new Date(2024, 5, 2),
        departureDate: new Date(2024, 5, 12),
        comment: "",
        sum: 5000,
    },
    {
        id: 3,
        title: "Отель большой",
        status: Status.PaidFor,
        address: "47 Market Rd, Superior Bldg, Columbus, Ohio, 45993",
        telephone: 89372456435,
        visitorsNumber: 1,
        roomType: RoomType.Lux,
        visitirContact: "RhebaAbernathy@nowhere.com",
        arrivalDate: new Date(2024, 4, 30),
        departureDate: new Date(2024, 5, 1),
        comment:
            "To sort everything out, it is worth mentioning that the explicit" +
            " examination of sufficient amount should correlate with The Programming of Justificatory Development",
        sum: 5000,
    },
];
