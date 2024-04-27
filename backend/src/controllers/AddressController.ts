import AddressModel from "../models/Address";
import { Address } from "../types/db_types";
import { GenericController } from "./GenericController";

export class AddressController extends GenericController<
    Address,
    typeof AddressModel
> {
    constructor() {
        super(AddressModel);
    }

    createErrorMessages(): [string] {
        return ["Не удалось создать адрес"];
    }

    getAllErrorMessages(): [string] {
        return ["Не удалось получить адреса"];
    }

    getOneErrorMessages(): [string, string, string] {
        return [
            "Адрес не найден",
            "Не удалось вернуть адрес",
            "Не удалось получить адрес",
        ];
    }
    deleteOneErrorMessages(): [string, string, string] {
        return [
            "Адрес не найден",
            "Не удалось вернуть адрес",
            "Не удалось получить адрес",
        ];
    }
    updateOneErrorMessages(): [string, string, string] {
        return [
            "Адрес не найден",
            "Не удалось вернуть адрес",
            "Не удалось получить адрес",
        ];
    }
}
