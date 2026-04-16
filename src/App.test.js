// App.test.js

// 1. MOCKS FIRST
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(() => Promise.resolve({ docs: [] })),
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

jest.mock("./js/firebase", () => ({
  db: {},
  auth: { currentUser: null },
}));

// 2. IMPORTS AFTER MOCKS
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import cartReducer from "./features/CartSlice";
import App from "./App";

// 3. HELPER FUNCTION
function renderWithProviders(ui) {
  const store = configureStore({
    reducer: { cart: cartReducer },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return {
    ...render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {ui}
        </QueryClientProvider>
      </Provider>
    ),
    store,
    queryClient,
  };
}

// 4. ACTUAL TEST
test("renders app without crashing", () => {
  const { container } = renderWithProviders(<App />);
  expect(container.firstChild).toBeInTheDocument();
});