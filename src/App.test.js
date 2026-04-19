// App.test.js

// ✅ Add this FIRST (fixes toBeInTheDocument error)
import '@testing-library/jest-dom';

// ✅ Mock your service layer (prevents Firebase crashes)
jest.mock('./services/productService', () => ({
  getAllProducts: jest.fn(() =>
    Promise.resolve([
      { id: 1, name: "Mock Product", price: 10 }
    ])
  )
}));

// ✅ Mock Firebase (safe fallback)
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(() =>
    Promise.resolve({
      docs: [],
    })
  ),
  addDoc: jest.fn(() => Promise.resolve()),
  updateDoc: jest.fn(() => Promise.resolve()),
  deleteDoc: jest.fn(() => Promise.resolve()),
  doc: jest.fn(),
  serverTimestamp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(() => () => {}),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

// ❌ DO NOT include this (it caused your earlier error)
// jest.mock("./js/firebase", ...)

// =========================
// IMPORTS
// =========================

import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import cartReducer from "./features/CartSlice";
import App from "./App";

// =========================
// HELPER
// =========================

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

// =========================
// TEST
// =========================

test("renders app without crashing", () => {
  const { container } = renderWithProviders(<App />);
  expect(container.firstChild).toBeInTheDocument();
});