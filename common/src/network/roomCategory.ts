import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";
import { AuthSuccess, RoomCategory, ModelAddition } from "../db_types";
import { GenericNetwork } from "./genericNetwork";

// GET /roomCategories
// GET /roomCategories/:id
// POST /roomCategories
// DELETE /roomCategories/:id
// PATCH /roomCategories/:id

export type TRoomCategory = ModelAddition & RoomCategory;
export type TRoomCategoryWithoutId = Omit<TRoomCategory, "_id">;

export class RoomCategoryNetwork extends GenericNetwork {
  /**
   * Possible errors:
   *
   * status 500 - internal server error
   *
   */
  getAll = () => {
    return this.axios.get<Array<TRoomCategory>>(`/roomCategories`);
  };

  /**
   * Possible errors:
   *
   * status 404 - hotel not found
   *
   * status 500 - internal server error
   *
   */
  getById = (id: number) => {
    return this.axios.get<TRoomCategory>(`/roomCategories/${id}`);
  };

  /**
   * Possible errors:
   *
   * status 500 - internal server error
   *
   */
  create = (hotelBooking: RoomCategory) => {
    return this.axios.post<TRoomCategoryWithoutId>(
      `/roomCategories`,
      hotelBooking
    );
  };

  /**
   * Possible errors:
   *
   * status 404 - hotel not found
   *
   * status 500 - internal server error
   *
   */
  deleteById = (id: number) => {
    return this.axios.delete<TRoomCategory>(`/roomCategories/${id}`);
  };

  /**
   * Possible errors:
   *
   * status 404 - hotel not found
   *
   * status 500 - internal server error
   *
   */
  updateById = (id: number, newRoomCategory: RoomCategory) => {
    return this.axios.patch<TRoomCategory>(
      `/roomCategories/${id}`,
      newRoomCategory
    );
  };
}
