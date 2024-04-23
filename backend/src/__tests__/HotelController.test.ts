import { getData } from "./utilsForTests";
import http from "http";
import MongoConnector from "../dbConnector";
import { mongoURL, dbNameTest } from "../config";
import { app } from "../index";

describe("Test HotelController", () => {
    let server: http.Server;
    let dbConnect;
    beforeAll(() => {
        dbConnect = MongoConnector.connect(mongoURL, dbNameTest);
        server = app.listen(2000, () => {
            console.log("All right!");
        });
    });
    describe("Methods = { GET }", () => {
        test("Test get /hotels", async () => {
            const res = await getData("/hotels");
            expect(res.status).toBe(200);
            expect(Object.keys(res.data[0])).toEqual([
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
            const res = await getData(`/hotels/${testId}`);
            expect(res.status).toBe(200);
            expect(Object.keys(res.data)).toEqual([
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
            const error = await getData(`/hotels/${testId}`);
            expect(error.response.status).toBe(404);
        });
        test("Test get /hotels/{id}, id format - not objectID", async () => {
            const testId = "1";
            const error = await getData(`/hotels/${testId}`);
            expect(error.response.status).toBe(500);
        });
        test("Test get /search/hotel (not param)", async () => {
            const error = await getData("/search/hotel");
            expect(error.response.status).toBe(400);
        });
        test("Test get /search/hotel (by param: TestPlace)", async () => {
            const res = await getData("/search/hotel?place=TestPlace");
            expect(res.status).toBe(200);
            expect(Object.keys(res.data[0])).toEqual([
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
            const error = await getData("/search/hotel?place=BadTestPlace");
            expect(error.response.status).toBe(404);
        });
    });
    afterAll(() => {
        // MongoConnector.disconnect(dbConnect);

        server.close();
    });
});
