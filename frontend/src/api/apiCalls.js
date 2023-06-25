import API from ".";

export function getUser(id, token) {
  return API.fetchJSON(`/api/v1/users/${id}`, token);
}

export function createUser(body, token) {
  return API.fetchJSON("/api/v1/users", token, body);
}
