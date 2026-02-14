import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { AuthProvider } from "./auth/AuthProvider";
import ErrorBoundary from "./ErrorBoundary";
import "./index.css";

import { applyTheme, getSavedTheme } from "./theme/applyTheme";

try {
  applyTheme(getSavedTheme());
} catch (err) {
  console.warn("TFA_THEME_BOOT_FAIL", err);
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider><App /></AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
