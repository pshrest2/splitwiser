import API from ".";

export function getUser(id, token) {
  return API.fetchJSON(`/api/v1/users/${id}`, token);
}

export function updateUser(id, body, token) {
  return API.fetchJSON(`/api/v1/users/${id}`, token, body, { method: "PATCH" });
}
