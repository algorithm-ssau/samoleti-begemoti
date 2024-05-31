import { PersonalInfo } from "../user_type";
import { GenericNetwork } from "./genericNetwork";

export interface ChangePassword {
    userEmail: string;
    oldPassword: string;
    newPassword: string;
}

export class ProfileRequests extends GenericNetwork {
    /**
     * Errors:
     *  401 - Unathorized - Wrong login/password
     */
    changePassword = (oldPassword: string, newPassword: string) => {
        return this.axios.post("/profile/changePassword", {
            oldPassword,
            newPassword,
        });
    };

    /**
     *  update personal info
     *
     *  401 - Unathorized - Wrong login/password
     */
    update = (personalInfo: PersonalInfo) => {
        return this.axios.post("/profile/update", personalInfo);
    };
}
