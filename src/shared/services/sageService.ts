import { getConnectionUrl, status, json, jsonHeaders } from "./connection";
import { SaveResult } from "../domain/saveResult";
import { SageVM } from "../domain/dtos/sage";

const rootUrl = getConnectionUrl() + "sage";

export function getAll() {
    return fetch(rootUrl)
        .then(status)
        .then(response => json<SageVM[]>(response));
}

export function getById(id: number) {
    return fetch(`${rootUrl}/${id}`)
        .then(status)
        .then(response => json<SageVM>(response));
}

export function remove(id: number) {
    return fetch(`${rootUrl}/${id}`, { method: "DELETE" })
        .then(status);
}

export function save(sage: SageVM) {
    return fetch(rootUrl, { headers: jsonHeaders, method: "POST", body: JSON.stringify(sage) })
        .then(status)
        .then(response => json<SaveResult>(response));
}
