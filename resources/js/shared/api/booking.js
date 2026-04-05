import { apiRequest } from "./client";

export async function createDemoBooking(input) {
  return apiRequest("/api/v1/demo-bookings", {
    method: "POST",
    body: JSON.stringify(input)
  });
}
