import { Review } from "samolet-common";
import ReviewModel from "../models/Reviews";
import { GenericController } from "./GenericController";

export class ReviewController extends GenericController<
    Review,
    typeof ReviewModel
> {
    constructor() {
        super(ReviewModel);
    }

    createErrorMessages(): [string] {
        return ["Не удалось добавить отзыв"];
    }

    getAllErrorMessages(): [string] {
        return ["Не удалось получить отзыв"];
    }

    getOneErrorMessages(): [string, string, string] {
        return [
            "Отзыв не найден",
            "Не удалось вернуть отзыв",
            "Не удалось получить отзыв",
        ];
    }

    deleteErrorMessages(): [string, string, string] {
        return [
            "Отзыв не найден",
            "Не удалось вернуть отзыв",
            "Не удалось получить отзыв",
        ];
    }

    updateOneErrorMessages(): [string, string, string] {
        return [
            "Отзыв не найден",
            "Не удалось вернуть отзыв",
            "Не удалось получить отзыв",
        ];
    }
}
