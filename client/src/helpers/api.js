import axios from "axios";
import { environment } from "./env";

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

export const api = {
    health,    
};
