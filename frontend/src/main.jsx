import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Sign from "./Sign.jsx";
import User from "./User.jsx";
import Worker from "./Worker.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/user" element={<User />} />
        <Route path="/worker" element={<Worker />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
