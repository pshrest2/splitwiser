import API from ".";

// plaid
export function getLinkToken(token) {
  return API.fetchJSON("/api/v1/plaid", token);
}

// users
export function getUser(token) {
  return API.fetchJSON(`/api/v1/user`, token);
}

export function getUsers(token) {
  return API.fetchJSON(`/api/v1/users`, token);
}

export function updateUser(body, token) {
  return API.fetchJSON(`/api/v1/users`, token, body, { method: "PATCH" });
}

export function createUser(body, token) {
  return API.fetchJSON(`/api/v1/users`, token, body);
}

// user friends
export function getFriends(token) {
  return API.fetchJSON(`/api/v1/friends`, token);
}

export function addFriends(body, token) {
  return API.fetchJSON(`/api/v1/friends`, token, body);
}

// user groups
export function getUserGroups(token) {
  return API.fetchJSON(`/api/v1/groups`, token);
}

export function createUserGroup(body, token) {
  return API.fetchJSON(`/api/v1/groups`, token, body);
}

export function deleteUserGroup(group_id, token) {
  return API.fetchJSON(`/api/v1/groups/${group_id}`, token, null, {
    method: "DELETE",
  });
}

// user accounts
export function getUserAccounts(token) {
  return API.fetchJSON(`/api/v1/accounts`, token);
}

export function createUserAccount(body, token) {
  return API.fetchJSON(`/api/v1/accounts`, token, body);
}

export function deleteUserAccount(account_id, token) {
  return API.fetchJSON(`/api/v1/accounts/${account_id}`, token, null, {
    method: "DELETE",
  });
}

// user account transactions
export function getTransactions(account_id, token) {
  return API.fetchJSON(`/api/v1/accounts/${account_id}/transactions`, token);
}
