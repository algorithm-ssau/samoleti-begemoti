import HotelBookingModel from "../models/HotelBooking";
import { HotelBooking } from "samolet-common";
import { GenericController } from "./GenericController";

export class HotelBookingController extends GenericController<
    HotelBooking,
    typeof HotelBookingModel
> {
    constructor() {
        super(HotelBookingModel);
    }

    createErrorMessages(): [string] {
        return ["Не удалось создать пользователя"];
    }

    getAllErrorMessages(): [string] {
        return ["Не удалось получить пользователя"];
    }

    getOneErrorMessages(): [string, string, string] {
        return [
            "Пользователь не найден",
            "Не удалось вернуть пользователя",
            "Не удалось получить пользователя",
        ];
    }
    deleteOneErrorMessages(): [string, string, string] {
        return [
            "Пользователь не найден",
            "Не удалось вернуть пользователя",
            "Не удалось получить пользователя",
        ];
    }
    updateOneErrorMessages(): [string, string, string] {
        return [
            "Пользователь не найден",
            "Не удалось вернуть пользователя",
            "Не удалось получить пользователя",
        ];
    }
}
