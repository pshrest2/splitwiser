import API from ".";

// plaid
export function getLinkToken(token) {
  return API.fetchJSON("/api/v1/plaid", token);
}

// users
export function getUser(token) {
  return API.fetchJSON(`/api/v1/user`, token);
}

export function updateUser(body, token) {
  return API.fetchJSON(`/api/v1/users`, token, body, { method: "PATCH" });
}

export function createUser(body, token) {
  return API.fetchJSON(`/api/v1/users`, token, body);
}

// user accounts
export function getUserAccounts(token) {
  return API.fetchJSON(`/api/v1/accounts`, token);
}

export function createUserAccount(body, token) {
  return API.fetchJSON(`/api/v1/users/accounts`, token, body);
}

export function deleteUserAccount(account_id, token) {
  return API.fetchJSON(`/api/v1/accounts/${account_id}`, token, null, {
    method: "DELETE",
  });
}

// user account transactions
export function getTransactions(user_id, account_id, token) {
  return API.fetchJSON(
    `/api/v1/users/${user_id}/accounts/${account_id}/transactions`,
    token
  );
}
