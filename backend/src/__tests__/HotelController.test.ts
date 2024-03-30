import { getData } from "./utilsForTests";

describe("Test HotelController", () => {
    test("Test get /hotels", async () => {
        const res = await getData("/hotels");
        // console.log(res);
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
    // test("Test get /search/hotel (not param)", async () => {
    //     const res = await getData("/search/hotel");
    //     // console.log(res);
    //     expect(res.status).toBe(400);
    // });
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
//     test("Test get /search/hotel (by param: BadTestPlace)", async () => {
//       const res = await getData("/search/hotel?place=BadTestPlace");
//       expect(res.status).toBe(404);
//     //   expect(res.data).toEqual([]);
//   });
});

test("guaranteed random", () => {
    expect(2 + 2).toBe(4);
});
