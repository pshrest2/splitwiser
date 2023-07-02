import API from ".";

export function getUser(id, token) {
  return API.fetchJSON(`/api/v1/users/${id}`, token);
}

export function createUser(body, token) {
  return API.fetchJSON("/api/v1/users", token, body);
}

export function updateUser(id, body, token) {
  return API.fetchJSON(`/api/v1/users/${id}`, token, body, { method: "PATCH" });
}

export function authCallback(body, token) {
  return API.fetchJSON("/api/v1/auth", token, body);
}
