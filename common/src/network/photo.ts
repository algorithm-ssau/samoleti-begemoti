import axios, { Axios, AxiosInstance, CreateAxiosDefaults } from "axios";
import { Photo, AuthSuccess } from "../db_types";
import { GenericNetwork } from "./genericNetwork";

// GET /photos
// GET /photos/:id
// POST /photos
// DELETE /photos/:id
// PATCH /photos/:id

export class PhotoNetwork extends GenericNetwork {
    allPhotos() {
        return getAllPhotos();
    }

    photoById(id: number) {
        return getOnePhotoById(id);
    }

    create(photo: Photo) {
        return createPhoto(this.axios, photo);
    }

    deleteById(id: number) {
        return deletePhotoById(this.axios, id);
    }

    updateById(id: number) {
        return updatePhotoById(this.axios, id);
    }
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function getAllPhotos() {
    return axios.get(`/photos`);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function getOnePhotoById(id: number) {
    return axios.get(`/photos/${id}`);
}

/**
 * Possible errors:
 *
 * status 500 - internal server error
 *
 */
export async function createPhoto(axios: AxiosInstance, photo: Photo) {
    return axios.post<AuthSuccess>(`/photos`, photo);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function deletePhotoById(axios: AxiosInstance, id: number) {
    return axios.delete<AuthSuccess>(`/photos/${id}`);
}

/**
 * Possible errors:
 *
 * status 404 - hotel not found
 *
 * status 500 - internal server error
 *
 */
export async function updatePhotoById(axios: AxiosInstance, id: number) {
    return axios.patch<AuthSuccess>(`/photos/${id}`);
}
