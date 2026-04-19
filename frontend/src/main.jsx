import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";

const theme = localStorage.getItem("theme");

if (theme === "dark") {
    document.documentElement.classList.add("dark");
} else {
    document.documentElement.classList.remove("dark");
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
        <Toaster position="top-center" reverseOrder={false} />
    </StrictMode>,
);
