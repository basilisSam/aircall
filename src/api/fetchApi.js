import { BASE_URL } from "../constants";
import { getAuthorizationToken } from "../service/login";

export const handleResponse = (response) => {
  if (response.ok) return response.json().catch(() => {});
  if (response.status === 401) {
    throw response;
  }
  throw response.text();
};

export const fetchWrapper = async ({
  endpoint,
  method = "GET",
  headers = {
    "Content-Type": "application/json",
    Authorization: getAuthorizationToken(),
  },
  body,
} = {}) => {
  const payload = { method, headers };
  if (body) {
    payload.body = JSON.stringify(body);
  }
  const response = await fetch(BASE_URL + endpoint, payload);
  return handleResponse(response);
};
