import express, { Router } from "express";
import { test } from "./util";
import { mongoURL, dbNameTest, port } from "./config";
import MongoConnector from "./dbConnector";
import * as Routers from "./routers/index";
import { authMiddleware } from "./middleware/AuthMiddleware";

export const app = express();
app.use(express.json());
MongoConnector.connect(mongoURL, dbNameTest);

app.use((req, res, next) => {
    console.log(`got request with url: ${req.url}`);
    next();
});

app.use("/", Routers.addressRouter);
app.use("/", Routers.hotelRouter);
app.use("/", Routers.hotelFacilityRouter);
app.use("/", Routers.roomCategoryRouter);
app.use("/", Routers.roomRouter);
app.use("/", Routers.photoRouter);

app.use("/", Routers.userRouter);
app.use("/", Routers.authRouter);
app.use("/", Routers.hotelBookingRouter);

app.use(
    Router()
        .use(authMiddleware)
        .get("/", async (req, res) => {
            console.log(`received claim: ${JSON.stringify(req.claim)}`);
            res.send(test());
        })
);

app.listen(port, () => {
    console.log(
        "ехал гослинг навстречу концовке\n сценарист сказал не переживай\n гослинг ответил не переживу"
    );
});
