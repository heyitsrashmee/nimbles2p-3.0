import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NimbleS2PHomepage from "./pages/MainFile.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NimbleS2PHomepage />
  </StrictMode>
);
