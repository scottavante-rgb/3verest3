import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import FloatingWidget from "./FloatingWidget";
import "./styles/glass.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/floating" element={<FloatingWidget />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
