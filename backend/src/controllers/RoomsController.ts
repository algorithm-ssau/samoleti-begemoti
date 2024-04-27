import RoomModel from "../models/Rooms";
import { GenericController } from "./GenericController";
import { Room } from "samolet-common";

export class RoomsController extends GenericController<Room, typeof RoomModel> {
    constructor() {
        super(RoomModel);
    }

    createErrorMessages(): [string] {
        return ["Не удалось добавить комнату"];
    }

    getAllErrorMessages(): [string] {
        return ["Не удалось получить комнаты"];
    }

    getOneErrorMessages(): [string, string, string] {
        return [
            "Комната не найдена",
            "Не удалось вернуть комнату",
            "Не удалось получить комнату",
        ];
    }

    deleteErrorMessages(): [string, string, string] {
        return [
            "Комната не найдена",
            "Не удалось вернуть комнату",
            "Не удалось получить комнату",
        ];
    }

    updateOneErrorMessages(): [string, string, string] {
        return [
            "Комната не найдена",
            "Не удалось вернуть комнату",
            "Не удалось получить комнату",
        ];
    }
}
