import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";
import { AuthSuccess } from "../db_types";
import { Review } from "../user_type";
import { GenericNetwork } from "./genericNetwork";

// GET /reviews
// GET /reviews/:id
// POST /reviews
// DELETE /reviews/:id
// PATCH /reviews/:id

export class ReviewNetwork extends GenericNetwork {
    allReviews() {
        return getAllReviews();
    }

    reviewById(id: number) {
        return getOneReviewById(id);
    }

    create(review: Review) {
        return createReview(this.axios, review);
    }

    deleteById(id: number) {
        return deleteReviewById(this.axios, id);
    }

    updateById(id: number) {
        return updateReviewById(this.axios, id);
    }
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function getAllReviews() {
    return axios.get(`/reviews`);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function getOneReviewById(id: number) {
    return axios.get(`/reviews/${id}`);
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function createReview(axios: AxiosInstance, review: Review) {
    return axios.post<AuthSuccess>(`/reviews`, review);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function deleteReviewById(axios: AxiosInstance, id: number) {
    return axios.delete<AuthSuccess>(`/reviews/${id}`);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function updateReviewById(axios: AxiosInstance, id: number) {
    return axios.patch<AuthSuccess>(`/reviews/${id}`);
}
