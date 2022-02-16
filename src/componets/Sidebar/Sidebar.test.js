import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, it } from "@jest/globals";
import { MemoryRouter } from "react-router-dom";
import { Tractor } from "@aircall/tractor";
import Sidebar from "./Sidebar";
import Home from "../Home/Home";

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

it("should change groupByDate toggle value on click", () => {
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

  const toggle = screen.getByTestId("groupByDateToggleId");
  expect(toggle.checked).toEqual(true);
  fireEvent.click(toggle, { target: { checked: false } });
  expect(toggle.checked).toEqual(false);
});

it("should change archived toggle value on click ", () => {
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

  const toggle = screen.getByTestId("showArchiveToggleId");
  expect(toggle.checked).toEqual(false);
  fireEvent.click(toggle, { target: { checked: true } });
  expect(toggle.checked).toEqual(true);
});