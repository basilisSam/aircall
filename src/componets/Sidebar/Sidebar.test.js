import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, it } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";
import { Tractor } from "@aircall/tractor";
import Sidebar from "./Sidebar";

afterEach(cleanup);

it("should have toggle enabled", () => {
  render(
    <MemoryRouter>
      <Tractor>
        <Sidebar
          groupByDateToggle={true}
          groupCallsByDate={jest.fn()}
          showArchived={jest.fn()}
          showArchivedToggle={false}
        />
      </Tractor>
    </MemoryRouter>
  );

  const checkbox = screen.getByTestId("groupByDateToggleId");
  expect(checkbox.checked).toEqual(true);
});

it("should change toggle value on click", () => {
  render(
    <MemoryRouter>
      <Tractor>
        <Sidebar
          groupByDateToggle={true}
          groupCallsByDate={jest.fn()}
          showArchived={jest.fn()}
          showArchivedToggle={false}
        />
      </Tractor>
    </MemoryRouter>
  );

  const checkbox = screen.getByTestId("groupByDateToggleId");
  expect(checkbox.checked).toEqual(true);
  fireEvent.click(checkbox, { target: { checked: false } });
  expect(checkbox.checked).toEqual(false);
});
