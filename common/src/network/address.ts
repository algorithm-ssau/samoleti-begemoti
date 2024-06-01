import { Address, ModelAddition } from "../db_types";
import { GenericNetwork } from "./genericNetwork";

// GET /addresses
// GET /addresses/:id
// POST /addresses
// DELETE /addresses/:id
// PATCH /addresses/:id

export type TAddress = ModelAddition & Address;
export type TAddressWithoutId = Omit<TAddress, "_id">;

export class AddressNetwork extends GenericNetwork {
    /**
     * Possible errors:
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    getById(id: number) {
        return this.axios.get<TAddress>(`/addresses/${id}`);
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
        return this.axios.delete<TAddress>(`/addresses/${id}`);
    }

    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    create(address: Address) {
        return this.axios.post<TAddress>(`/addresses`, address);
    }

    /**
     * Possible errors:
     *
     * status 500 - internal server error
     *
     */
    getAll() {
        return this.axios.get<Array<TAddress>>(`/addresses`);
    }

    /**
     * Possible errors:
     *
     * status 404 - hotel not found
     *
     * status 500 - internal server error
     *
     */
    updateById(id: number, newAddress: Address) {
        return this.axios.patch<TAddress>(`/hotels/${id}`, newAddress);
    }
}
