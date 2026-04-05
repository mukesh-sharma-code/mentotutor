import { apiRequest } from "./client";

export async function createUser(input) {
  return apiRequest("/api/v1/users", {
    method: "POST",
    body: JSON.stringify(input)
  });
}
