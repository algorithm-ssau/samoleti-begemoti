import PhotoModel from "../models/Photo";
import { Photo } from "samolet-common/db_types";
import { GenericController } from "./GenericController";

export class PhotoController extends GenericController<
    Photo,
    typeof PhotoModel
> {
    constructor() {
        super(PhotoModel);
    }

    createErrorMessages(): [string] {
        return ["Не удалось добавить фото"];
    }

    getAllErrorMessages(): [string] {
        return ["Не удалось получить фото"];
    }

    getOneErrorMessages(): [string, string, string] {
        return [
            "Фото не найдено",
            "Не удалось вернуть фото",
            "Не удалось получить фото",
        ];
    }

    deleteErrorMessages(): [string, string, string] {
        return [
            "Фото не найдено",
            "Не удалось вернуть фото",
            "Не удалось получить фото",
        ];
    }

    updateOneErrorMessages(): [string, string, string] {
        return [
            "Фото не найдено",
            "Не удалось вернуть фото",
            "Не удалось получить фото",
        ];
    }
}
