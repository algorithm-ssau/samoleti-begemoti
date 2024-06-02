import type { Address } from "samolet-common";
import { getNetwork } from "../../network";
import { type NetworkDescription, fromDescription } from "../utils/wrapNetwork";

const network = getNetwork();

const description = {
    createaddress: network.address.create,
    addressById: network.address.getById,
    getAllAddresses: network.address.getAll,
    deleteAddressById: network.address.deleteById,
    updateAddressById: (data: { id: number; newAddress: Address }) =>
        network.address.updateById(data.id, data.newAddress),
} satisfies NetworkDescription;

export const addressThunks = fromDescription(description);
