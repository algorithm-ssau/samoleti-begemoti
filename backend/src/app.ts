import express, { Router } from "express";
import { test } from "./util";

import { authMiddleware } from "./middleware/AuthMiddleware";
import { errorMiddleware } from "./middleware/ErrorLoggerMiddleware";
import {
    addressRouter,
    hotelRouter,
    hotelFacilityRouter,
    roomRouter,
    photoRouter,
    authRouter,
    hotelBookingRouter,
    userRouter,
    profileRouter,
} from "./routers";

export const app = express();
app.use(express.json());

app.use((req, res, next) => {
    console.log(`got request with url: ${req.method} ${req.url}`);
    next();
})
    .use("/", addressRouter)
    .use("/", hotelRouter)
    .use("/", hotelFacilityRouter)
    .use("/", roomRouter)
    .use("/", photoRouter)
    .use("/", userRouter)
    .use("/", authRouter)
    .use("/booking", hotelBookingRouter)
    .use("/profile", profileRouter)
    .use(
        Router()
            .use(authMiddleware)
            .get("/", async (req, res) => {
                console.log(`received claim: ${JSON.stringify(req.claim)}`);
                res.send(test());
            })
    )
    .use(errorMiddleware);
