import { Schema, model } from "mongoose";
import { HotelTransaction, AirplaneTransaction, SomeTransaction } from "samolet-common";

// export interface HotelTransaction {
//     type: "hotel";
//     room: Room;
// }

// export interface AirplaneTransaction {
//     type: "airplane";
//     airplaneInfo: string;
// }

// export type SomeTransaction = HotelTransaction | AirplaneTransaction;

// const HotelTransactionSchema = new Schema<HotelTransaction>({
//     type: { type: String, enum: ['hotel'], required: true },
//     room: { type: Schema.Types.ObjectId, ref: "Room", required: true }
// });

// const AirplaneTransactionSchema = new Schema<AirplaneTransaction>({
//     type: { type: String, enum: ['airplane'], required: true },
//     airplaneInfo: { type: String, required: true }
// });

const SomeTransactionSchema = new Schema<SomeTransaction>({
    type: { type: String, required: true, enum: ['hotel', 'airplane'] },
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true }
    // airplaneInfo: String
}, {
    timestamps: true,
    // discriminatorKey: 'type', // Это ключ для определения типа документа
    // _id: false // Отключаем генерацию _id для этой подсхемы, так как она будет частью AccountTransaction
});

export default model("SomeTransaction", SomeTransactionSchema);