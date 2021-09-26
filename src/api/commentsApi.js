import axios from "axios";
import { BASE_URL } from "../constants/endpoints";

export function getCommentById(id) {
    return new Promise((resolve, reject) => {
        axios
        .get(`${BASE_URL}/comments/${id}`)
        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
            reject(error)
        });
    });
}

export function getCommentsByPostId(id) {
    return new Promise((resolve, reject) => {
        axios
        .get(`${BASE_URL}/comments?postId=${id}`)
        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
            reject(error);
        });
    });
}

export function addOneComment(comment) {
    return new Promise((resolve, reject) => {
        axios
        .post(`${BASE_URL}/comments`, comment)
        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
            reject(error);
        });
    });
}
