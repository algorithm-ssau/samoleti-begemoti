import { Schema, model } from "mongoose";
// import { BankAccount as BankAcc } from "../types/user_type";

// export interface BankAccount {
//     amount: BigInt;
//     transactions: AccountTransaction[];
// }

const BankAccount = new Schema(
    {
        amount: { type: BigInt, required: true },
        transactions: [
            {
                type: Schema.Types.ObjectId,
                ref: "AccountTransaction",
                required: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default model("BankAccount", BankAccount);
