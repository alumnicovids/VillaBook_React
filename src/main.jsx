import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { VillaProvider } from "@/context/VillaContext.jsx";
import { Toast } from "@/components/common/Toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <VillaProvider>
      <Toast />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VillaProvider>
  </StrictMode>,
);
