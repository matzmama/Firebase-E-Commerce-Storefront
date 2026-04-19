import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

test("basic test works", () => {
  render(<div>Hello Test</div>);
  expect(screen.getByText("Hello Test")).toBeInTheDocument();
});