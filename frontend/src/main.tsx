import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import "@/styles/index.css";

import { App } from "./app";

const rootElement = document.getElementById("root") as HTMLDivElement;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  throw new Error("Root element must be empty");
}
