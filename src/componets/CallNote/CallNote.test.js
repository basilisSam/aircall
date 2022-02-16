import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Tractor } from "@aircall/tractor";
import CallNote from "./CallNote";

it("should render a note", () => {
  const note = {
    content: "A sample note",
    id: "123",
  };

  render(
    <MemoryRouter>
      <Tractor>
        <CallNote note={note} />
      </Tractor>
    </MemoryRouter>
  );
    
  screen.getByText(note.content);
});
