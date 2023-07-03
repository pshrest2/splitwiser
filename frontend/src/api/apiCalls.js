import API from ".";

// plaid
export function getLinkToken(token) {
  return API.fetchJSON("/api/v1/plaid", token);
}

// users
export function getUser(id, token) {
  return API.fetchJSON(`/api/v1/users/${id}`, token);
}

export function updateUser(id, body, token) {
  return API.fetchJSON(`/api/v1/users/${id}`, token, body, { method: "PATCH" });
}

// user accounts
export function getUserAccounts(user_id, token) {
  return API.fetchJSON(`/api/v1/users/${user_id}/accounts`, token);
}

export function createUserAccount(user_id, body, token) {
  return API.fetchJSON(`/api/v1/users/${user_id}/accounts`, token, body);
}

export function deleteUserAccount(user_id, account_id, token) {
  return API.fetchJSON(
    `/api/v1/users/${user_id}/accounts/${account_id}`,
    token,
    null,
    { method: "DELETE" }
  );
}
