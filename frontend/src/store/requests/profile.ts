import { getNetwork } from "../../network";
import { type NetworkDescription, fromDescription } from "../utils/wrapNetwork";

const network = getNetwork();

const profileRequests = {
    getUserPersonalInfo: network.profile.info,
    updatePersonalInfo: network.profile.update,
} satisfies NetworkDescription;

export const profileThunks = fromDescription(profileRequests);
