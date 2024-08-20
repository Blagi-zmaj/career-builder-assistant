import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TestHome from "../TestHome";

describe("Home", () => {
  for (let i = 1; i <= 3; i++) {
    it(`renders a heading${i}`, () => {
      render(<TestHome />);

      const heading = screen.getByRole("heading", { level: i });
      expect(heading).toBeInTheDocument();
    });
  }
});
