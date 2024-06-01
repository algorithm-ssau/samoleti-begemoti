import { Hotel, NewHotelRequest } from "samolet-common";
import { RequestParser } from "./RequestParser";
import { assert } from "typia";
import { Request } from "express";
export class HotelRequestParser extends RequestParser<Hotel> {
    parseBody(req: Request): Hotel {
        return assert<Hotel>(req.body);
    }

    parseCreateRequest(req: Request): NewHotelRequest {
        return assert<NewHotelRequest>(req.body);
    }
}
