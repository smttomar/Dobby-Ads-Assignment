import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validate = (field, value) => {
        let message = "";

        if (!value.trim()) {
            message = `${field} is required`;
        } else {
            if (field === "email" && !emailRegex.test(value)) {
                message = "Invalid email format";
            }
        }

        setErrors((prev) => ({
            ...prev,
            [field]: message,
        }));
    };

    const validateAll = () => {
        const newErrors = {};

        if (!email.trim()) newErrors.email = "Email is required";
        else if (!emailRegex.test(email))
            newErrors.email = "Invalid email format";

        if (!password.trim()) newErrors.password = "Password is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validateAll()) return;

        try {
            setLoading(true);

            const res = await API.post("/auth/login", { email, password });

            localStorage.setItem("token", res.data.token);

            toast.success("Login successful");

            navigate("/dashboard");
        } catch (err) {
            toast.error(err?.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
                <img
                    src="/login.png"
                    alt="Logo"
                    className="w-16 mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Welcome Back
                </h2>

                {/* Email */}
                <input
                    className={`w-full mb-4 p-2 border rounded-lg ${
                        errors.email ? "border-red-500" : ""
                    }`}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        validate("email", e.target.value);
                    }}
                />
                {errors.email && (
                    <p className="text-red-500 text-xs mb-2">{errors.email}</p>
                )}

                {/* Password */}
                <input
                    className={`w-full mb-4 p-2 border rounded-lg ${
                        errors.password ? "border-red-500" : ""
                    }`}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        validate("password", e.target.value);
                    }}
                />
                {errors.password && (
                    <p className="text-red-500 text-xs mb-3">
                        {errors.password}
                    </p>
                )}

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-zinc-700 text-white py-2 rounded-lg hover:bg-zinc-800 hover:cursor-pointer flex justify-center items-center transition"
                >
                    {loading ? <Spinner /> : "Login"}
                </button>

                <p className="text-sm mt-3 text-center">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-500">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
