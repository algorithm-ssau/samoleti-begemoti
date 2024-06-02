import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";
import { AuthSuccess, Room, ModelAddition } from "../db_types";
import { GenericNetwork } from "./genericNetwork";

// GET /rooms
// GET /rooms/:id
// POST /rooms
// DELETE /rooms/:id
// PATCH /rooms/:id

export type TRoom = ModelAddition & Room;
export type TRoomWithoutId = Omit<TRoom, "_id">;

export class RoomNetwork extends GenericNetwork {
  /**
   * Possible errors:
   *
   * status 500 - internal server error
   *
   */
  getAll = () => {
    return this.axios.get<Array<TRoom>>(`/rooms`);
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
    return this.axios.get<TRoom>(`/rooms/${id}`);
  };

  /**
   * Possible errors:
   *
   * status 500 - internal server error
   *
   */
  create = (hotelBooking: Room) => {
    return this.axios.post<TRoomWithoutId>(`/rooms`, hotelBooking);
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
    return this.axios.delete<TRoom>(`/rooms/${id}`);
  };

  /**
   * Possible errors:
   *
   * status 404 - hotel not found
   *
   * status 500 - internal server error
   *
   */
  updateById = (id: number, newRoom: Room) => {
    return this.axios.patch<TRoom>(`/rooms/${id}`, newRoom);
  };
}
