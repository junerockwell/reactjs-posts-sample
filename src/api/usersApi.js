import axios from "axios";
import { BASE_URL } from "../constants/endpoints";

export function getUserById(id) {
    return axios
    .get(`${BASE_URL}/users/${id}`)
    .then((response) => {
        return response.data;
    }).catch(error => {
        return error;
    });
}
