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
import { log } from "./log";

export const app = express();
app.use(express.json());

const zero = (x: number): string => {
    if (x < 10) return `0${x}`;
    else return `${x}`;
};
app.use((req, res, next) => {
    const date = new Date();

    const D = zero(date.getDate());
    const M = zero(date.getMonth());
    const YY = date.getUTCFullYear() % 100;

    const x = date.toTimeString().substring(0, 8);
    const timestamp = date.toISOString();
    log(
        `[${D}-${M}-${YY} ${x}]: ${req.ip} got request with url: ${req.method} ${req.url}`
    );
    next();
})
    .use("/", authRouter)
    .use("/", addressRouter)
    .use("/", hotelFacilityRouter)
    .use("/", roomRouter)
    .use("/", photoRouter)
    .use("/", userRouter)
    .use("/booking", hotelBookingRouter)
    .use("/profile", profileRouter)
    .use("/", hotelRouter)
    .use(
        Router()
            .use(authMiddleware)
            .get("/", async (req, res) => {
                console.log(`received claim: ${JSON.stringify(req.claim)}`);
                res.send(test());
            })
    )
    .use(errorMiddleware);
