import { MemoryRouter } from "react-router-dom";
import React from "react";

import { render, screen } from "@testing-library/react";
import { Tractor } from "@aircall/tractor";
import GroupByDateCalls from "./GroupByDateCalls";

test("should show Login form", () => {
  const groupCalls = {
    "2022-01-01": [
      { id: "1", created_at: "2022-01-01T00:00:00" },
      { id: "2", created_at: "2022-01-01T00:00:00" },
    ],
    "2022-03-02": [{ id: "3", created_at: "2022-03-02T00:00:00" }],
  };

  render(
    <MemoryRouter>
      <Tractor>
        <GroupByDateCalls groupByDate={groupCalls} updateCall={jest.fn()} />
      </Tractor>
    </MemoryRouter>
  );

  screen.getByText("2022-01-01");
  screen.getByText("2022-03-02");
});
