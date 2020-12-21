import axios from "axios";
import { environment } from "./env";

const USER_ID = '5fb45a8f2f831603b9d4f32c';

function client(baseUrl) {
    return axios.create({
        baseURL: baseUrl,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

function health() {
    return client(environment.service.base, null).get(
        environment.service.routes.health,
    );
}

function users(id) {
    return client(environment.service.base, null).get(
        environment.service.routes.users + "/" + id,
    );
}

function updateUserEmail(id, email) {
    return client(environment.service.base, null).put(
        environment.service.routes.editUser,
        {
            id,
            email
        }
    );
}
export const api = {
    health,
    users,
    updateUserEmail
};
