import http from "http";
import MongoConnector from "../dbConnector";
import { mongoURL, dbNameTest } from "../config";
import { Booking, Network, PersonalInfo, User } from "samolet-common";
import axios from "axios";
import { UserMongoWorker } from "../mongoworkers/UserMongoWorker";
import mongoose from "mongoose";
import { app } from "../app";
import { unauthorized } from "./utilsForTests";
import { hash, signToken } from "../controllers/NewUserController";
import { log } from "../log";
import { TUser } from "samolet-common/src/network/user";
import { assert, is } from "typia";

describe("Test ProfileController", () => {
    let server: http.Server;

    beforeAll(done => {
        let dbConnect = MongoConnector.connect(mongoURL, dbNameTest);
        server = app.listen(3000, () => {
            dbConnect.then(() => {
                log(`app listens, db connected`);
                done();
            });
        });
    }, 10000);

    const network = new Network(config => axios.create(config));

    describe("booking", () => {
        const email = "test_booking@test.ru";
        const password = "foobar";

        const userMongo = new UserMongoWorker();
        let user: TUser;

        beforeAll(() => {
            return userMongo
                .createBlank(email, hash(password))
                .then(savedUser => {
                    user = savedUser as User as TUser;
                });
        });
        test("with no token", () =>
            unauthorized(() =>
                network.user.book({
                    dateFrom: new Date().valueOf(),
                    dateTo: new Date().valueOf(),
                    hotelId: "foo",
                    roomId: "bar",
                })
            ));
        test("with token", async () => {
            const token = signToken({
                user_id: user._id as any,
                email: user.email,
            });

            {
                network.setToken(token);
                const { status, data } = await network.user.bookings();
                expect(status).toBe(200);
                expect(data.length).toBe(0);
            }

            {
                const { status, data } = await network.user.book({
                    dateFrom: new Date().valueOf(),
                    dateTo: new Date().valueOf(),
                    hotelId: "foo",
                    roomId: "bar",
                });

                expect(status).toBe(200);
            }

            {
                network.setToken(token);
                const { status, data } = await network.user.bookings();
                expect(status).toBe(200);
                expect(data.length).toBe(1);

                const booking = hydrateBooking(data[0]);

                assert<Booking>(booking);

                expect(booking.hotelId).toBe("foo");
                expect(booking.roomId).toBe("bar");
            }
        });
        afterAll(() => {
            log(mongoose.connection.readyState + "");

            return userMongo.deleteByEmail(email);
        });
    });

    afterAll(done => {
        const promise = mongoose.disconnect();
        server.close(err => {
            console.log(
                `server closed, waiting for mongoose to disconnect, status ${mongoose.connection.readyState}`
            );
            promise.then(done);
        });
    }, 20000);
});

export function hydrateBooking(booking: Booking): Booking {
    return {
        ...booking,
        dateFrom: new Date(booking.dateFrom),
        dateTo: new Date(booking.dateTo),
    };
}
