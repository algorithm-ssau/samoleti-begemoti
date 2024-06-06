import { PersonalInfo, AccountTransaction } from "../user_type";
import { GenericNetwork } from "./genericNetwork";
import { Booking } from "../booking";

export interface ChangePassword {
    userEmail: string;
    oldPassword: string;
    newPassword: string;
}

export type TAccountTransaction = AccountTransaction & {_id: string}
export type TBooking = Booking & {_id: string} | Booking & {_id: string, fixedPrice: number} 

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
    addMoney = (amount: number) => {
        return this.axios.post(
            `/profile/money`, {"amount": amount}
        ).then(response => {
            const parsedDate = new Date(response.data.date);
            return {
                ...response.data,
                date: parsedDate
            };
        })
        .catch(error => {
            console.error('Ошибка при пополнении счета:', error);
            throw error;
        });
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
    getTransactions = () => {
        return this.axios.get<Array<TAccountTransaction>>("/profile/transactions")
            .then(response => {
                const transactions = response.data.map(transaction => {
                    const parsedDate = new Date(transaction.date);
                    const parsedAmount = BigInt(String(transaction.amount));
                    return {
                        ...transaction,
                        date: parsedDate,
                        amount: parsedAmount
                    };
                });
                return transactions;
            })
            .catch(error => {
                console.error('Ошибка при получении транзакций:', error);
                throw error;
            });
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
    getBookings = () => {
        return this.axios.post<Array<TBooking>>(
            `/profile/bookings`
        ).then(response => {
            const bookings = response.data.map(booking => {
                const parsedDateFrom = new Date(booking.dateFrom);
                const parsedDateTo = new Date(booking.dateTo);
                return {
                    ...booking,
                    dateFrom: parsedDateFrom,
                    dateTo: parsedDateTo
                };
            });
            return bookings;
        })
        .catch(error => {
            console.error('Ошибка при получении бронирований:', error);
            throw error;
        });;
    }

}
