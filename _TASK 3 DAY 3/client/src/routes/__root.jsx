import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Header from "../Header";
import PizzaoftheDay from "../PizzaoftheDay";
import { CartContext, LanguageProvider } from "../contexts";
import ErrorBoundary from "../ErrorBoundary.jsx";

export const Route = createRootRoute({
  component: () => {
    const cartHook = useState([]);

    // http://localhost:5173 => root URL, outlet bakal memuat component yang di-assign ke URL root.

    // http://localhost:5173/history => outlet bakal memuat component yang di-assign ke URL history.

    return (
      <>
        <LanguageProvider>
          <CartContext.Provider value={cartHook}>
            <div>
              <Header />
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
              <PizzaoftheDay />
            </div>
          </CartContext.Provider>
        </LanguageProvider>
        <TanStackRouterDevtools />
        <ReactQueryDevtools />
      </>
    );
  },
});
