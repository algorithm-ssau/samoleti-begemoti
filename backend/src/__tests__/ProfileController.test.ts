import http from "http";
import MongoConnector from "../dbConnector";
import { mongoURL, dbNameTest } from "../config";
import {
    ModelAddition,
    Network,
    PersonalInfo,
    User,
    UserCredentials,
} from "samolet-common";
import axios from "axios";
import { UserMongoWorker } from "../mongoworkers/UserMongoWorker";
import mongoose, { ObjectId } from "mongoose";
import { app } from "../app";
import { axiosRejects, unauthorized } from "./utilsForTests";
import { hash, signToken } from "../controllers/NewUserController";
import { log, testOnly } from "../log";
import { TUser } from "samolet-common/src/network/user";
import { is } from "typia";

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

    describe("/profile/update", () => {
        const userMongo = new UserMongoWorker();
        test("with no token", () =>
            unauthorized(() => network.profile.update({} as any)));
    });
    describe("/changePassword", () => {
        const userMongo = new UserMongoWorker();
        let user: TUser;

        beforeAll(() => {
            return userMongo
                .createBlank("test@test.ru", hash("foobar"))
                .then(savedUser => {
                    user = savedUser as User as TUser;
                });
        });
        test("with no token", () =>
            unauthorized(() =>
                network.profile.changePassword("pass", "pass2")
            ));
        test("with token", async () => {
            const token = signToken({
                user_id: user._id as any,
                email: user.email,
            });

            {
                network.setToken(token);
                const { status } = await network.profile.changePassword(
                    "foobar",
                    "amazingPa$$word"
                );
                expect(status).toBe(200);
            }

            {
                network.setToken("");
                const { status, data } = await network.auth.login(
                    "test@test.ru",
                    "amazingPa$$word"
                );

                expect(status).toBe(200);
                expect(typeof data.token).toBe("string");
            }
        });
        afterAll(() => {
            log(mongoose.connection.readyState + "");
            return userMongo.deleteByEmail("test@test.ru");
        });
    });

    describe("/profile/info", () => {
        const email = "test_info@test.ru";
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

        test("no token", async () => {
            unauthorized(() => network.profile.info());
        });

        test("with token", async () => {
            const { status, data } = await network.auth.login(email, password);

            expect(status).toBe(200);
            const token = data.token;

            {
                network.setToken(token);
                const { status, data } = await network.profile.info();
                expect(status).toBe(200);
                expect(is<Partial<PersonalInfo>>(data)).toBe(true);
                network.setToken("");
            }
        });

        test("update and read", async () => {
            const { status, data } = await network.auth.login(email, password);

            expect(status).toBe(200);
            const token = data.token;

            {
                network.setToken(token);

                const { status, data } = await network.profile.update({
                    name: "Mister",
                    surname: "Twister",
                });

                expect(status).toBe(200);
            }
            {
                const { status, data } = await network.profile.info();
                expect(status).toBe(200);
                expect(is<Partial<PersonalInfo>>(data)).toBe(true);
                expect(data.name).toBe("Mister");
                expect(data.surname).toBe("Twister");
                network.setToken("");
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
