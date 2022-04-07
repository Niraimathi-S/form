import User from "../types/User";

export function addUser(actionPayload: User) {
  return { type: "user/add", payload: actionPayload };
}

export function editUser(actionPayload: User) {
  return { type: "user/update", payload: actionPayload };
}

export function deleteUser(actionPayload: User) {
  return { type: "user/delete", payload: actionPayload };
}