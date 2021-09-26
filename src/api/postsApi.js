import axios from "axios";
import { BASE_URL } from "../constants/endpoints";

export function getAllPosts() {
    return axios
    .get(`${BASE_URL}/posts`)
    .then((response) => {
        return response.data;
    }).catch(error => {
        return error;
    });
}

export function getPostDetailById(id) {
    return axios
    .get(`${BASE_URL}/posts/${id}`)
    .then((response) => {
        return response.data;
    }).catch(error => {
        return error;
    });
}
