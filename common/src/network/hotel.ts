import axios from "axios";
import { Hotel, ModelAddition } from "../db_types";
import { GenericNetwork } from "./genericNetwork";

// GET /search/hotel?place=...
// GET /hotels
// GET /hotels/:id
// POST /hotels
// DELETE /hotels/:id
// PATCH /hotels/:id

export type THotel = ModelAddition & Hotel;
export type THotelWithoutId = Omit<THotel, "_id">;

export class HotelNetwork extends GenericNetwork {
    /**
     * Possible errors:
     *
     * status 400 - where place? invalid request
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    getByPlace(place: string) {
        return this.axios.get<Array<THotel>>(`/search/hotel?place=${place}`);
    }

    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    getAll() {
        return this.axios.get<Array<THotel>>(`/hotels`);
    }


    /**
     * Possible errors:
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    getById(id: string) {
        return this.axios.get<THotel>(`/hotels/${id}`);
    }

    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    create(hotel: Hotel) {
        return this.axios.post<THotelWithoutId>(`/hotels`, hotel);
    }

    /**
     * Possible errors:
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    deleteById(id: number) {
        return this.axios.delete<THotel>(`/hotels/${id}`);
    }

    /**
     * Possible errors:
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    updateById(id: number, newHotel: Hotel) {
        return axios.patch<THotel>(`/hotels/${id}`, newHotel);
    }
}
