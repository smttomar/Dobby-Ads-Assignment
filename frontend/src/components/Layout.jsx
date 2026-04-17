import { useState } from "react";
import { Folder, Upload, LogOut, Menu, HardDrive } from "lucide-react";

export default function Layout({ children }) {
    const [open, setOpen] = useState(true);
    const [logoutLoading, setLogoutLoading] = useState(false);

    return (
        <div className="flex min-h-screen bg-neutral-200 dark:bg-neutral-950">
            {/* Sidebar */}
            <div
                className={`bg-neutral-200 dark:bg-neutral-950 shadow-lg p-4 flex flex-col justify-between transition-all duration-300 ${
                    open ? "w-50" : "w-16"
                }`}
            >
                <div>
                    {/* Toggle Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="mb-6 text-neutral-600 dark:text-neutral-200 hover:text-blue-500 hover:cursor-pointer"
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
                            <h1 className="text-xl font-bold mb-6 text-black dark:text-white">
                                My Drive
                            </h1>
                        </span>
                    )}

                    {/* Menu */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-100 cursor-pointer hover:text-blue-500">
                            <Folder size={20} />
                            {open && (
                                <span className="text-black dark:text-white">
                                    My Drive
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-100 cursor-pointer hover:text-blue-500">
                            <Upload size={20} />
                            {open && <span>Uploads</span>}
                        </div>
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }}
                    className="flex items-center gap-3 text-zinc-500 dark:text-zinc-200 hover:text-zinc-600 dark:hover:text-zinc-400 hover:cursor-pointer transition"
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
