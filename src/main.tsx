import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExchangeRateContextProvider } from "./hooks/useExchangeRate.tsx";

const exchangeRateQueryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={exchangeRateQueryClient}>
      <ExchangeRateContextProvider>
        <App />
      </ExchangeRateContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
