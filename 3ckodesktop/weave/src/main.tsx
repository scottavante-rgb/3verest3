import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context";
import App from "./App";
import FloatingWidget from "./FloatingWidget";
import "./styles/glass.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/floating" element={<FloatingWidget />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
