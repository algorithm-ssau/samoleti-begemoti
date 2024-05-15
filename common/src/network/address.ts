import { Address, AuthSuccess } from "../db_types";
import { GenericNetwork } from "./genericNetwork";

// GET /addresses
// GET /addresses/:id
// POST /addresses
// DELETE /addresses/:id
// PATCH /addresses/:id

export class AddressNetwork extends GenericNetwork {
    /**
     * Possible errors:
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    byId(id: number) {
        return this.axios.get(`/addresses/${id}`);
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
        return this.axios.delete<AuthSuccess>(`/addresses/${id}`);
    }

    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    create(address: Address) {
        return this.axios.post<AuthSuccess>(`/addresses`, address);
    }

    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    all() {
        return this.axios.get(`/addresses`);
    }
}
