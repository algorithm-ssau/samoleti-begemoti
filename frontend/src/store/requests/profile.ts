import { getNetwork } from "../../network";
import { type NetworkDescription, fromDescription } from "../utils/wrapNetwork";

const network = getNetwork();

const profileRequests = {
    getUserPersonalInfo: network.profile.info,
    updatePersonalInfo: network.profile.update,
    updatePassword: (data: { oldPassword: string; newPassword: string }) =>
        network.profile.changePassword(data.oldPassword, data.newPassword),
} satisfies NetworkDescription;

export const profileThunks = fromDescription(profileRequests);
