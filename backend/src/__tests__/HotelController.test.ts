import { axiosRejects } from "./utilsForTests";
import http from "http";
import MongoConnector from "../dbConnector";
import { mongoURL, dbNameTest } from "../config";
import { app } from "../app";
import { Network } from "samolet-common";
import axios, { AxiosError } from "axios";
import { log } from "../log";

describe("Test HotelController", () => {
    let server: http.Server;
    let network = new Network(config =>
        axios.create({ ...config, baseURL: "http://localhost:2000" })
    );
    beforeAll(done => {
        let dbConnect = MongoConnector.connect(mongoURL, dbNameTest);
        server = app.listen(2000, () => {
            dbConnect.then(() => {
                log(`app listens, db connected`);
                done();
            });
        });
    });
    describe("Methods = { GET }", () => {
        test("Test get /hotels", async () => {
            const { data } = await network.hotel.getAll();
            expect(Object.keys(data[0])).toEqual([
                "_id",
                "name",
                "description",
                "photos",
                "address",
                "rooms",
                "reviews",
                "createdAt",
                "updatedAt",
                "__v",
            ]);
        });
        test("Test get /hotels/{id}, id format - objectID", async () => {
            const testId = "6605c79f74305e07ba094b71";
            const { status, data } = await network.hotel.getById(testId);

            expect(status).toBe(200);
            expect(Object.keys(data)).toEqual([
                "_id",
                "name",
                "description",
                "photos",
                "address",
                "rooms",
                "reviews",
                "createdAt",
                "updatedAt",
                "__v",
            ]);
        });
        test("Test get /hotels/{id}, id format - objectID", async () => {
            const testId = "6605c79f74305e07ffffffff";

            const request = network.hotel.getById(testId);
            const response = await axiosRejects(request);
            const { status } = response!;
            expect(status).toBe(404);
        });
        test("Test get /hotels/{id}, id format - not objectID", async () => {
            const testId = "1";
            const request = network.hotel.getById(testId);
            const response = await axiosRejects(request);
            const { status } = response!;
            expect(status).toBe(500);
        });
        test("Test get /search/hotel (by param: TestPlace)", async () => {
            const { status, data } = await network.hotel.getByPlace(
                "TestPlace"
            );

            log("before status");
            expect(status).toBe(200);
            log("after status");
            expect(Object.keys(data[0])).toEqual([
                "_id",
                "name",
                "description",
                "photos",
                "address",
                "rooms",
                "reviews",
                "createdAt",
                "updatedAt",
                "__v",
            ]);
        });
        test("Test get /search/hotel (by param: BadTestPlace)", async () => {
            const request = network.hotel.getByPlace("BadTestPlace");
            const response = await axiosRejects(request);
            const { status } = response!;

            expect(status).toBe(404);
        });
    });
    afterAll(done => {
        // MongoConnector.disconnect(dbConnect);

        server.close(() => done());
    });
});
