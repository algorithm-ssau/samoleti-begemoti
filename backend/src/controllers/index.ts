import { AddressController } from "./AddressController";
import { HotelController } from "./HotelController";
import { HotelFacilitiesController } from "./HotelFacilitiesController";
import { PhotoController } from "./PhotoController";
import { RoomsController } from "./RoomsController";

import { HotelBookingController } from "./HotelBookingController";
import { ReviewController } from "./ReviewController";
import { NewUserController } from "./NewUserController";
import { ProfileController } from "./ProfileController";

const address = new AddressController();
const hotel = new HotelController();
const hotelFacilities = new HotelFacilitiesController();
const photos = new PhotoController();
const room = new RoomsController();

const user = new NewUserController();
const auth = user;
const hotelBooking = new HotelBookingController();
const review = new ReviewController();
const profile = new ProfileController();

export { address as AddressController };
export { hotel as HotelController };
export { hotelFacilities as HotelFacilitiesController };
export { photos as PhotoController };
export { review as ReviewController };
export * as RoomCategoryController from "./RoomCategoryController";
export { room as RoomsController };
export { user as UserController };
export { auth as AuthController };
export { hotelBooking as HotelBookingController };
export { profile as ProfileController };
