import { afterEach, beforeEach, expect, it, jest } from "@jest/globals";
import * as fetchApi from "../api/fetchApi";
import { CALLS_URL } from "../constants";
import {
  generateGroupsByDate,
  getAllCalls,
  getCallInfo,
  updateCall,
  updateCalls,
} from "./calls";

let fetchApiSpy;
beforeEach(() => {
  fetchApiSpy = jest
    .spyOn(fetchApi, "fetchWrapper")
    .mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

it("should call fetch to retrieve all calls", async () => {
  await getAllCalls();

  expect(fetchApiSpy).toHaveBeenCalledWith({
    endpoint: CALLS_URL,
  });
});

it("should call fetch to retrieve a single call", async () => {
  const callId = 1;
  await getCallInfo(callId);

  expect(fetchApiSpy).toHaveBeenCalledWith({
    endpoint: CALLS_URL + callId,
  });
});

it("should update a call", async () => {
  const callId = 1;
  await updateCall(callId);

  expect(fetchApiSpy).toHaveBeenCalledWith({
    endpoint: CALLS_URL + callId + "/archive",
    method: "PUT",
  });
});

it("should group calls by date", async () => {
  const calls = [
    { id: 1, created_at: "2022-01-01T00:00:00" },
    { id: 2, created_at: "2022-01-01T00:00:00" },
    { id: 3, created_at: "2022-03-02T00:00:00" },
  ];
  const expectedGroups = {
    "2022-01-01": [
      { id: 1, created_at: "2022-01-01T00:00:00" },
      { id: 2, created_at: "2022-01-01T00:00:00" },
    ],
    "2022-03-02": [{ id: 3, created_at: "2022-03-02T00:00:00" }],
  };

  const groups = generateGroupsByDate(calls);
  expect(groups).toStrictEqual(expectedGroups);
});

it("should remove archive call from calls", async () => {
  const calls = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const callUpdated = {
    id: 1,
    is_archived: true,
  };

  const newCalls = updateCalls(calls, callUpdated);
  expect(newCalls).toHaveLength(calls.length - 1);
  expect(newCalls).toEqual([{ id: 2 }, { id: 3 }]);
});

it("should a call to the array if is not archive", async () => {
  const calls = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const callUpdated = {
    id: 1,
    is_archived: false,
  };

  const newCalls = updateCalls(calls, callUpdated);
  expect(newCalls).toHaveLength(calls.length + 1);
  expect(newCalls).toContain(callUpdated);
});
