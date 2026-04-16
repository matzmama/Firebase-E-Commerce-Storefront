jest.mock("./js/firebase", () => ({
  auth: {
    currentUser: null,
  },
}));

import { render } from "@testing-library/react";
import App from "./App";

test("renders app without crashing", () => {
  render(<App />);
});