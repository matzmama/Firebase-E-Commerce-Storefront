import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import cartReducer from "./features/CartSlice";
import App from "./App";

// Mock product service
jest.mock('./services/productService', () => ({
  getAllProducts: jest.fn(() =>
    Promise.resolve([
      { id: 1, name: "Mock Product", price: 10 }
    ])
  )
}));

function renderWithProviders(ui) {
  const store = configureStore({
    reducer: { cart: cartReducer },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    </Provider>
  );
}

test("integration: app renders product list and cart", async () => {
  renderWithProviders(<App />);

  // Check main UI loads
  expect(await screen.findByText(/product list/i)).toBeInTheDocument();
  expect(screen.getByText(/shopping cart/i)).toBeInTheDocument();

  // Check cart starts empty
  expect(screen.getByText(/total items:/i)).toBeInTheDocument();
});