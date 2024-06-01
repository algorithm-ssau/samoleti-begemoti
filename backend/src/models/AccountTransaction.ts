import { Schema, model } from "mongoose";
import { AccountTransaction as AccTrans } from "../types/user_type";

// export interface AccountTsransaction {
//     user: User;
//     date: Date;
//     amount: BigInt;
//     description: SomeTransaction;
// }

const AccountTransaction = new Schema<AccTrans>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        date: { type: Date, required: true },
        amount: { type: Number, required: true },
        description: { type: String, required: true } // Потом поменяем
    },
    {
        timestamps: true,
    }
);

export default model("AccountTransaction", AccountTransaction);
