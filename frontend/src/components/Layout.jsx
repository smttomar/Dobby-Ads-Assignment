import { useState } from "react";
import { Folder, Upload, LogOut, Menu, HardDrive } from "lucide-react";

export default function Layout({ children }) {
    const [open, setOpen] = useState(true);
    const [logoutLoading, setLogoutLoading] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`bg-white shadow-lg p-4 flex flex-col justify-between transition-all duration-300 ${
                    open ? "w-64" : "w-16"
                }`}
            >
                <div>
                    {/* Toggle Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="mb-6 text-gray-600 hover:text-blue-500 hover:cursor-pointer"
                    >
                        <Menu />
                    </button>

                    {/* Title */}
                    {open && (
                        <span className="flex items-center gap-2 text-2xl font-bold mb-6">
                            <HardDrive
                                size={24}
                                className="text-blue-500 mb-4"
                            />
                            <h1 className="text-xl font-bold mb-6">My Drive</h1>
                        </span>
                    )}

                    {/* Menu */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-500">
                            <Folder size={20} />
                            {open && <span>My Drive</span>}
                        </div>

                        <div className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-500">
                            <Upload size={20} />
                            {open && <span>Uploads</span>}
                        </div>
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    }}
                    className="flex items-center gap-3 text-zinc-500 hover:text-zinc-600 hover:cursor-pointer transition"
                >
                    {logoutLoading ? <Spinner /> : <LogOut size={18} />}
                    {open && <span>Logout</span>}
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">{children}</div>
        </div>
    );
}
