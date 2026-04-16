import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
    const [isAuth, setIsAuth] = useState(null); // 🔥 null initially

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuth(!!token);
    }, []);

    // 🔥 IMPORTANT: wait before rendering
    if (isAuth === null) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to={isAuth ? "/dashboard" : "/login"} />}
                />

                <Route
                    path="/login"
                    element={<Login setIsAuth={setIsAuth} />}
                />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
                />
            </Routes>
        </BrowserRouter>
    );
}
