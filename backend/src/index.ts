import { app } from "./app";
import { mongoURL, dbNameTest, port } from "./config";
import MongoConnector from "./dbConnector";

MongoConnector.connect(mongoURL, dbNameTest);
app.listen(port, () => {
    console.log(
        "ехал гослинг навстречу концовке\n сценарист сказал не переживай\n гослинг ответил не переживу"
    );
});
