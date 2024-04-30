import { UserForReview} from "../types/user_type";
import UserForReviewModel from "../models/UserForReview";
import { Request, Response } from "express";
import { GenericController } from "./GenericController";

export class UserForReviewController extends GenericController<
    UserForReview,
    typeof UserForReviewModel
>{
    constructor() {
        super(UserForReviewModel);
    }

    createErrorMessages(): [string] {
        return ["Не удалось добавить пользователя для просмотра"];
    }

    getAllErrorMessages(): [string] {
        return ["Не удалось получить пользователей для просмотра"];
    }

    getOneErrorMessages(): [string, string, string] {
        return [
            "Пользовтель для просмотра не найден",
            "Не удалось вернуть пользователя для просомтра",
            "Не удалось получить пользователя для просомтра"
        ];
    }

    deleteErrorMessages(): [string, string, string] {
        return [
            "Пользовтель для просмотра не найден",
            "Не удалось вернуть пользователя для просомтра",
            "Не удалось получить пользователя для просомтра"
        ];
    }

    updateOneErrorMessages(): [string, string, string] {
        return [
            "Пользовтель для просмотра не найден",
            "Не удалось вернуть пользователя для просомтра",
            "Не удалось получить пользователя для просомтра"
        ];
    }
}