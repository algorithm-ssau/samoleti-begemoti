import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";
import { AuthSuccess, ModelAddition } from "../db_types";
import { Review } from "../user_type";
import { GenericNetwork } from "./genericNetwork";

// GET /reviews
// GET /reviews/:id
// POST /reviews
// DELETE /reviews/:id
// PATCH /reviews/:id

export type TReview = ModelAddition & Review;
export type TReviewWithoutId = Omit<TReview, "_id">;

export class ReviewNetwork extends GenericNetwork {
    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    getAll() {
        return this.axios.get<Array<TReview>>(`/reviews`);
    }

    /**
     * Possible errors:
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    getById(id: number) {
        return this.axios.get<TReview>(`/reviews/${id}`);
    }

    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    create(hotelBooking: Review) {
        return this.axios.post<TReviewWithoutId>(
            `/reviews`,
            hotelBooking
        );
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
        return this.axios.delete<TReview>(`/reviews/${id}`);
    }

    /**
     * Possible errors:
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    updateById(id: number, newReview: Review) {
        return this.axios.patch<TReview>(`/reviews/${id}`, newReview);
    }
}
