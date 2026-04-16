import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import cartReducer from "./features/CartSlice";

// ❗ IMPORTANT: mock App dependencies if needed
import App from "./App";

function renderWithProviders(ui) {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
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

test("app renders without crashing", () => {
  const { container } = renderWithProviders(<App />);
  expect(container).toBeTruthy();
});