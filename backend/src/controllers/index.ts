import { AddressController } from "./AddressController";
import { HotelController } from "./HotelController";
import { HotelFacilitiesController } from "./HotelFacilitiesController";
import { PhotoController } from "./PhotoController";
import { RoomsController } from "./RoomsController";

const address = new AddressController();
const hotel = new HotelController();
const hotelFacilities = new HotelFacilitiesController();
const photos = new PhotoController();
const room = new RoomsController();
export { address as AddressController };
export { hotel as HotelController };
export { hotelFacilities as HotelFacilitiesController };
export { photos as PhotoController };
export * as ReviewController from "./ReviewController";
export * as RoomCategoryController from "./RoomCategoryController";
export { room as RoomsController };
