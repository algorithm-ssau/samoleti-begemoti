import UserModel from "../models/User";
import { User } from "../types/user_type";
import { GenericController } from "./GenericController";

export class UserController extends GenericController<
    User,
    typeof UserModel
> {
    constructor() {
        super(UserModel);
    }

    createErrorMessages(): [string] {
        return ["Не удалось создать пользователя"];
    }

    getAllErrorMessages(): [string] {
        return ["Не удалось получить пользователя"];
    }

    getOneErrorMessages(): [string, string, string] {
        return [
            "Пользователь не найден",
            "Не удалось вернуть пользователя",
            "Не удалось получить пользователя",
        ];
    }
    deleteOneErrorMessages(): [string, string, string] {
        return [
            "Пользователь не найден",
            "Не удалось вернуть пользователя",
            "Не удалось получить пользователя",
        ];
    }
    updateOneErrorMessages(): [string, string, string] {
        return [
            "Пользователь не найден",
            "Не удалось вернуть пользователя",
            "Не удалось получить пользователя",
        ];
    }
    async getOneByKey(key: string, value: any){
        console.log({[key] : value});
        let query = UserModel.findOne({ [key]: value });
        return query.then(doc => {
                if(!doc){
                    return false
                }
                console.log("Controller", doc)
                return true;
            })
            .catch((error: string) => {
                console.log(error);
                return 1;
            });
    }
}
