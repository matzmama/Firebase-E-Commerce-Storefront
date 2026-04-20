import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import Cart from "./Cart";

function renderWithRedux(ui) {
  const store = configureStore({
    reducer: { cart: cartReducer },
  });

  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
}

test("renders cart heading", () => {
  renderWithRedux(<Cart />);
  expect(screen.getByRole("heading", { name: /cart/i })).toBeInTheDocument();
});