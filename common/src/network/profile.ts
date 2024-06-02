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
    update = (personalInfo: Partial<PersonalInfo>) => {
        return this.axios.post("/profile/info", personalInfo);
    };

    /**
     * get own profile info
     *
     * 401 - Unauthorized - Wrong login/password
     */
    info = () => {
        return this.axios.get<Partial<PersonalInfo>>("/profile/info");
    };

    /**
     * 
     * Предварительно нужен токен
     * 
     * Possible errors:
     * 
     * status 400 - Missing amount
     * 
     * status 401 - Missing Authorization Header 
     * 
     * status 404 - BankAccount not found | User not found 
     * 
     * status 422 - Signature verification failed(Это про токен)
     * 
     * status 500 - internal server error
     * 
     */
    addMoney(amount: number){
        return this.axios.post(
            `/profile/money`, {"amount": amount}
        );
    }

    /**
     * 
     * Предварительно нужен токен
     * 
     * Possible errors:
     * 
     * status 401 - Missing Authorization Header 
     * 
     * status 404 - User not found 
     * 
     * status 422 - Signature verification failed(Это про токен)
     * 
     * status 500 - internal server error
     * 
     */
    getTransactions(){
        return this.axios.get("/profile/transactions");
    }


    /**
     * 
     * Предварительно нужен токен
     * 
     * Possible errors:
     * 
     * status 401 - Missing Authorization Header 
     * 
     * status 404 - Hotel not found | User not found 
     * 
     * status 422 - Signature verification failed(Это про токен)
     * 
     * status 500 - internal server error
     * 
     */
    getBookings(){
        return this.axios.post(
            `/profile/bookings`
        );
    }

}
