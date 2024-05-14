import HotelFacilityModel from "../models/HotelFacilities";
import { Request, Response } from "express";
import { GenericController } from "./GenericController";
import { HotelFacilities } from "samolet-common";

export class HotelFacilitiesController extends GenericController<
    HotelFacilities,
    typeof HotelFacilityModel
> {
    constructor() {
        super(HotelFacilityModel);
    }

    createErrorMessages(): [string] {
        return ["Не удалось добавить услугу отеля"];
    }

    getAllErrorMessages(): [string] {
        return ["Не удалось получить услугу отеля"];
    }

    getOneErrorMessages(): [string, string, string] {
        return [
            "Услуга не найдена",
            "Не удалось вернуть услуги",
            "Не удалось получить услуги отеля",
        ];
    }

    deleteErrorMessages(): [string, string, string] {
        return [
            "Услуга не найдена",
            "Не удалось вернуть услуги",
            "Не удалось получить услуги отеля",
        ];
    }

    updateOneErrorMessages(): [string, string, string] {
        return [
            "Услуга не найдена",
            "Не удалось вернуть услуги",
            "Не удалось получить услуги отеля",
        ];
    }
}
