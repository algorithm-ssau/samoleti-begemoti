import express from "express";
import { test, get } from "./util";
import { mongoURL, dbNameTest } from "./config";
import MongoConnector from "./dbConnector";
import * as Routers from "./routers/index";

let app = express();
app.use(express.json());
MongoConnector.connect(mongoURL, dbNameTest);

app.get("/", async (req, res) => {
    res.send(test());
    await get("/search/hotel");
    // console.log(rese.status);
    // console.log(rese.data[0]);
});

app.use("/", Routers.addressRouter);
app.use("/", Routers.hotelRouter);
app.use("/", Routers.hotelFacilityRouter);
app.use("/", Routers.roomCategoryRouter);
app.use("/", Routers.roomRouter);
app.use("/", Routers.photoRouter);

app.listen(3000, () => {
    console.log(
        "ехал гослинг навстречу концовке\n сценарист сказал не переживай\n гослинг ответил не переживу"
    );
});
