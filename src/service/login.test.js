import { jest, it, afterEach, expect } from "@jest/globals";
import { getAuthorizationToken, login, logout } from "./login";
import * as fetchApi from "../api/fetchApi";
import { LOGIN_URL } from "../constants";

afterEach(() => {
  jest.restoreAllMocks();
});

it("should send payload to login endpoint", async () => {
  const fetchApiSpy = jest.spyOn(fetchApi, "fetchWrapper").mockResolvedValue({
    access_token: "aToken",
    refresh_token: "aRefreshToken",
  });

  jest.spyOn(Object.getPrototypeOf(window.localStorage), "setItem");

  await login("someUsername", "somePassword", jest.fn());

  expect(fetchApiSpy).toHaveBeenCalledWith({
    endpoint: LOGIN_URL,
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: {
      username: "someUsername",
      password: "somePassword",
    },
  });
});

it("should set access_token & refresh_token to the sessionStorage", async () => {
  jest.spyOn(fetchApi, "fetchWrapper").mockResolvedValue({
    access_token: "aToken",
    refresh_token: "aRefreshToken",
  });
  jest.spyOn(Object.getPrototypeOf(window.localStorage), "setItem");

  await login("someUsername", "somePassword", jest.fn());

  expect(sessionStorage.setItem).toHaveBeenCalledTimes(2);
  expect(sessionStorage.setItem).toHaveBeenCalledWith("jwt", "aToken");
  expect(sessionStorage.setItem).toHaveBeenCalledWith(
    "refreshToken",
    "aRefreshToken"
  );
});

it("should clear session storage", () => {
  jest.spyOn(Object.getPrototypeOf(window.localStorage), "clear");
  logout(jest.fn());
  expect(sessionStorage.clear).toHaveBeenCalledTimes(1);
});

it("should retrieve accessToken", () => {
  jest.spyOn(Object.getPrototypeOf(window.localStorage), "getItem");
  getAuthorizationToken();
  expect(sessionStorage.getItem).toHaveBeenCalledTimes(1);
  expect(sessionStorage.getItem).toHaveBeenCalledWith("jwt");
});
