jest.mock("./firebase"); 
import { render } from "@testing-library/react";
import App from "./App";


jest.mock("./js/firebase");

test("renders app without crashing", () => {
  render(<App />);
});