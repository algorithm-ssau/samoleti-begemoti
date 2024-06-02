import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";
import { Photo, AuthSuccess, ModelAddition } from "../db_types";
import { GenericNetwork } from "./genericNetwork";

// GET /photos
// GET /photos/:id
// POST /photos
// DELETE /photos/:id
// PATCH /photos/:id

export type TPhoto = ModelAddition & Photo;
export type TPhotoWithoutId = Omit<TPhoto, "_id">;

export class PhotoNetwork extends GenericNetwork {
  /**
   * Possible errors:
   *
   * status 500 - internal server error
   *
   */
  getAll = () => {
    return this.axios.get<Array<TPhoto>>(`/photos`);
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
    return this.axios.get<TPhoto>(`/photos/${id}`);
  };

  /**
   * Possible errors:
   *
   * status 500 - internal server error
   *
   */
  create = (hotelBooking: Photo) => {
    return this.axios.post<TPhotoWithoutId>(`/photos`, hotelBooking);
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
    return this.axios.delete<TPhoto>(`/photos/${id}`);
  };

  /**
   * Possible errors:
   *
   * status 404 - hotel not found
   *
   * status 500 - internal server error
   *
   */
  updateById = (id: number, newPhoto: Photo) => {
    return this.axios.patch<TPhoto>(`/photos/${id}`, newPhoto);
  };
}
