import mongoose from "mongoose";

class MongoConnector {
    constructor() {}
    static connect(dbURL: String, dbName: String) {
        mongoose
            .connect(`${dbURL}${dbName}`)
            .then((dbConnection) => {
                console.log("Соединение с БД установлено");
                return dbConnection;
            })
            .catch((err) => {
                console.log("Ошибка подключения к БД", err);
                return null;
            });
    }

    static disconnect(dbConnection: typeof mongoose) {
        if (!dbConnection){
            console.log("Соединение с БД отсутствует!")
        }
        else{
            dbConnection.disconnect()
            .then(() => {
                console.log("Соединение с БД разорвано");
            })
            .catch((err) => {
                console.log("Ошибка разрыва соединения с БД", err);
            });
        }
    }
        
}
export default MongoConnector;
