import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Marks that JS is running, so the CSS may hide elements ahead of their
// GSAP reveal. Without this class every .reveal element stays visible, which
// is the correct no-JS fallback.
document.documentElement.classList.add("js-anim");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
