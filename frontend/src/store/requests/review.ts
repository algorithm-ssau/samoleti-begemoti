import type { Review } from "samolet-common";
import { getNetwork } from "../../network";
import { type NetworkDescription, fromDescription } from "../utils/wrapNetwork";

const network = getNetwork();

const description = {
    createreview: network.review.create,
    reviewById: network.review.getById,
    getAllReviews: network.review.getAll,
    deleteReviewById: network.review.deleteById,
    updateReviewById: (data: { id: number; newReview: Review }) =>
        network.review.updateById(data.id, data.newReview),
} satisfies NetworkDescription;

export const reviewThunks = fromDescription(description);
