import type { User } from "samolet-common";
import { getNetwork } from "../../network";
import { type NetworkDescription, fromDescription } from "../utils/wrapNetwork";

const network = getNetwork();

const description = {
    createuser: network.user.create,
    userById: network.user.getById,
    getAllUsers: network.user.getAll,
    deleteUserById: network.user.deleteById,
    updateUserById: (data: { id: number; newUser: User }) =>
        network.user.updateById(data.id, data.newUser),
    bookings: network.user.bookings,
    book: network.user.book,
} satisfies NetworkDescription;

export const userThunks = fromDescription(description);
