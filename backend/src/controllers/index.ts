import { AddressController } from "./AddressController";
import { HotelController } from "./HotelController";
import { HotelFacilitiesController } from "./HotelFacilitiesController";
import { PhotoController } from "./PhotoController";
import { RoomsController } from "./RoomsController";
import { ReviewController } from "./ReviewController";

const address = new AddressController();
const hotel = new HotelController();
const hotelFacilities = new HotelFacilitiesController();
const photos = new PhotoController();
const room = new RoomsController();
const review = new ReviewController();

export { address as AddressController };
export { hotel as HotelController };
export { hotelFacilities as HotelFacilitiesController };
export { photos as PhotoController };
export { review as ReviewController};
export * as RoomCategoryController from "./RoomCategoryController";
export { room as RoomsController };
