import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import cartReducer from "./features/CartSlice";
import App from "./App";

// Mock product service to stop React Query error
jest.mock('./services/productService', () => ({
  getAllProducts: jest.fn().mockResolvedValue([])
}));

test("integration: cart updates when adding product", async () => {
  // ✅ SINGLE STORE (important)
  const store = configureStore({
    reducer: { cart: cartReducer },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  );

  // Wait for app to load
  expect(await screen.findByText(/product list/i)).toBeInTheDocument();

  // Initially empty
  expect(screen.getByText(/no items in cart/i)).toBeInTheDocument();

  // ✅ Dispatch to SAME store used by UI
  store.dispatch({
    type: "cart/addToCart",
    payload: { id: 1, name: "Test Product", price: 10, quantity: 1 }
  });

  // ✅ Now UI should update
  expect(await screen.findByText(/total items/i)).toBeInTheDocument();
});