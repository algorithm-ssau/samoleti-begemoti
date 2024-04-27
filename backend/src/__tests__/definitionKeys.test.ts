import Hotel from "../models/Hotel";
import Address from "../models/Address";
import { getRefKeys, getKeys } from "../controllers/GenericController";

function expectSameKeys(keys: string[], correctKeys: string[]) {
    expect(keys.length).toBe(correctKeys.length);
    for (let i = 0; i < keys.length; i++) {
        expect(keys[i]).toBe(correctKeys[i]);
    }
}

describe("Test definition key extraction", () => {
    test("ref extraction from Hotel model", () => {
        const keys = getRefKeys(Hotel);
        const correctKeys = ["photos", "address", "rooms", "reviews"];

        expectSameKeys(keys, correctKeys);
    });
    test("ref extraction when there are no refs in model", () => {
        const keys = getRefKeys(Address);
        const correctKeys = new Array();

        expectSameKeys(keys, correctKeys);
    });
    test("all keys extraction", () => {
        const keys = getKeys(Hotel);
        const correctKeys = [
            "name",
            "description",
            "photos",
            "address",
            "rooms",
            "reviews",
        ];

        expectSameKeys(keys, correctKeys);
    });
});
