import "dotenv/config";
import { app } from "./app";
import { mongoURL, dbNameTest, port } from "./config";
import MongoConnector from "./dbConnector";

const mongoHost = process.env.MONGO_HOST ?? "127.0.0.1";
const mongoUrl = `mongodb://${mongoHost}:27017/`;
MongoConnector.connect(mongoUrl, dbNameTest);
app.listen(port, () => {
    console.log(
        "ехал гослинг навстречу концовке\n сценарист сказал не переживай\n гослинг ответил не переживу"
    );
});
