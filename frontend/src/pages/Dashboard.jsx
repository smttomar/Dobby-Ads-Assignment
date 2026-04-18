import { useEffect, useState } from "react";
import API from "../services/api";
import FolderCard from "../components/FolderCard";
import Layout from "../components/Layout";
import {
    LogOut,
    Upload,
    FolderPlus,
    ImageUp,
    Moon,
    SunIcon,
    MoonStar,
    MoonIcon,
    SunDim,
    Delete,
    Edit,
    Trash2Icon,
    Save,
    Cross,
    X,
} from "lucide-react";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

export default function Dashboard() {
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [name, setName] = useState("");
    const [currentFolder, setCurrentFolder] = useState(null);
    const [path, setPath] = useState([]);
    const [loading, setLoading] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [renameModal, setRenameModal] = useState(null);
    const [newName, setNewName] = useState("");
    const [deleteModal, setDeleteModal] = useState(null);
    const [deleteFileModal, setDeleteFileModal] = useState(null);
    const [createLoading, setCreateLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteFileLoading, setDeleteFileLoading] = useState(false);

    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains("dark"),
    );
    const toggleDarkMode = () => {
        const newDark = !isDark;

        if (newDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }

        setIsDark(newDark);
    };

    // 🔥 NEW: preview state
    const [preview, setPreview] = useState(null);

    // Fetch folders
    const fetchFolders = async () => {
        try {
            setLoading(true);
            const res = await API.get("/folders");

            const filtered = res.data.filter(
                (f) =>
                    (f.parent === null && currentFolder === null) ||
                    f.parent === currentFolder,
            );

            setFolders(filtered);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch files
    const fetchFiles = async () => {
        try {
            const res = await API.get(`/files/${currentFolder || ""}`);
            setFiles(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchFolders();
        fetchFiles();
    }, [currentFolder]);

    // Create folder
    const createFolder = async () => {
        if (!name.trim()) return;

        try {
            setCreateLoading(true);
            await API.post("/folders", {
                name,
                parent: currentFolder,
            });

            setName("");
            fetchFolders();
        } catch {
            alert("Error creating folder");
        } finally {
            setCreateLoading(false);
        }
    };

    // Navigate into folder
    const openFolder = (folder) => {
        setPath([...path, folder]);
        setCurrentFolder(folder._id);
    };

    // Breadcrumb navigation
    const goToFolder = (index) => {
        const newPath = path.slice(0, index + 1);
        setPath(newPath);
        setCurrentFolder(newPath[newPath.length - 1]?._id || null);
    };

    // Upload file
    const uploadFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        if (currentFolder) {
            formData.append("folder", currentFolder);
        }

        try {
            setUploadLoading(true);

            await API.post("/files", formData);

            fetchFiles();
        } catch {
            toast.error("Upload failed ❌");
        } finally {
            setUploadLoading(false);
        }
    };

    // Delete folder
    const deleteFolder = async (id) => {
        try {
            setDeleteLoading(true);
            await API.delete(`/folders/${id}`);
            fetchFolders();
        } catch {
            toast.error("Failed to delete folder");
        } finally {
            setDeleteLoading(false);
        }
    };

    // Rename folder
    const renameFolder = async () => {
        if (!newName.trim()) return;

        try {
            setRenameLoading(true);
            await API.put(`/folders/${renameModal}`, { name: newName });
            setRenameModal(null);
            setNewName("");
            fetchFolders();
        } catch {
            toast.error("Rename failed");
        } finally {
            setRenameLoading(false);
        }
    };

    // Delete file
    const deleteFile = async (id) => {
        try {
            setDeleteFileLoading(true);
            await API.delete(`/files/${id}`);
            fetchFiles();
        } catch {
            toast.error("Failed to delete file");
        } finally {
            setDeleteFileLoading(false);
        }
    };

    // Confirm delete folder
    const confirmDelete = async () => {
        try {
            setDeleteLoading(true);
            await API.delete(`/folders/${deleteModal}`);
            setDeleteModal(null);
            fetchFolders();
        } catch {
            toast.error("Delete failed");
        } finally {
            setDeleteLoading(false);
        }
    };

    const confirmDeleteFile = async () => {
        try {
            setDeleteFileLoading(true);
            await API.delete(`/files/${deleteFileModal}`);
            setDeleteFileModal(null);
            fetchFiles();
        } catch {
            toast.error("Failed to delete file");
        } finally {
            setDeleteFileLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 p-6 rounded-lg shadow-md">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-black dark:text-white">
                        My Drive
                    </h1>

                    {/* Right side buttons */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle FIRST */}
                        <button
                            onClick={toggleDarkMode}
                            className="relative w-14 h-7 flex items-center bg-neutral-300 dark:bg-neutral-700 rounded-full p-1 transition duration-300 hover:cursor-pointer"
                        >
                            <div
                                className={`w-5 h-5 dark:bg-neutral-200 bg-neutral-500 text-white dark:text-black rounded-full shadow-md transform transition duration-300 flex items-center justify-center text-xs ${
                                    isDark ? "translate-x-7" : "translate-x-0"
                                }`}
                            >
                                {isDark ? <MoonIcon /> : <SunDim />}
                            </div>
                        </button>

                        {/* Logout SECOND */}
                        <button
                            onClick={() => {
                                setLogoutLoading(true);
                                localStorage.removeItem("token");
                                window.location.href = "/login";
                            }}
                            className="bg-zinc-500 text-white px-4 py-2 rounded-lg hover:bg-zinc-600 flex items-center justify-center hover:cursor-pointer"
                        >
                            {logoutLoading ? <Spinner /> : <LogOut size={18} />}
                        </button>
                    </div>
                </div>

                {/* Breadcrumb */}
                <div className="mb-4 flex flex-wrap gap-2 text-sm text-black dark:text-neutral-300">
                    <span
                        className="cursor-pointer text-blue-500 font-medium"
                        onClick={() => {
                            setPath([]);
                            setCurrentFolder(null);
                        }}
                    >
                        Root
                    </span>

                    {path.map((p, i) => (
                        <span key={p._id} className="flex gap-2">
                            /
                            <span
                                className="cursor-pointer text-blue-500"
                                onClick={() => goToFolder(i)}
                            >
                                {p.name}
                            </span>
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <input
                        className="border p-2 rounded-lg w-48 bg-white dark:bg-neutral-800 text-black dark:text-white border-neutral-300 dark:border-neutral-700"
                        placeholder="Folder name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button
                        onClick={createFolder}
                        disabled={createLoading}
                        className="bg-zinc-500 p-4 text-white px-4 py-2 rounded-lg shadow hover:shadow-2xl cursor-pointer transition hover:scale-105"
                    >
                        {createLoading ? <Spinner /> : <FolderPlus />}
                    </button>

                    <label
                        className={`bg-[#e93f3f] text-white px-4 py-2 rounded-lg shadow hover:shadow-2xl cursor-pointer transition flex items-center justify-center hover:scale-105 ${
                            uploadLoading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                        {uploadLoading ? (
                            <Spinner />
                        ) : (
                            <>
                                <ImageUp className="inline-block" />
                            </>
                        )}

                        <input
                            type="file"
                            onChange={uploadFile}
                            className="hidden"
                            disabled={uploadLoading}
                        />
                    </label>
                </div>

                {/* Folders */}
                <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">
                    Folders
                </h2>

                {loading ? (
                    <p className="text-neutral-400">Loading...</p>
                ) : folders.length === 0 ? (
                    <p className="text-neutral-400">No folders here</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                        {folders.map((folder) => (
                            <div key={folder._id} className="relative group">
                                <FolderCard
                                    folder={folder}
                                    openFolder={openFolder}
                                />
                                <div className="absolute top-2 right-2 hidden group-hover:flex gap-2">
                                    <button
                                        onClick={() => {
                                            setRenameModal(folder._id);
                                            setNewName(folder.name);
                                        }}
                                        className="text-blue-500 text-xs hover:cursor-pointer transition hover:scale-110"
                                    >
                                        <Edit size={16} />
                                    </button>

                                    <button
                                        onClick={() =>
                                            setDeleteModal(folder._id)
                                        }
                                        className="text-[#e93f3f] text-xs hover:cursor-pointer transition hover:scale-110"
                                    >
                                        <Trash2Icon size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Files */}
                <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">
                    Files
                </h2>

                {files.length === 0 ? (
                    <p className="text-neutral-400">No files here</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {files.map((file) => (
                            <div
                                key={file._id}
                                className="relative group bg-white dark:bg-neutral-800 rounded-2xl shadow hover:shadow-xl hover:scale-105 transition duration-200 p-3"
                            >
                                <img
                                    src={file.path}
                                    alt=""
                                    onClick={() => setPreview(file.path)}
                                    className="h-32 w-full object-cover rounded-lg mb-2 cursor-pointer"
                                />
                                <p className="text-xs text-neutral-700 dark:text-neutral-300 truncate">
                                    {file.name}
                                </p>
                                <button
                                    onClick={() => setDeleteFileModal(file._id)}
                                    className="absolute -top-1 -right-1 hidden group-hover:flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-neutral-800 text-[#e93f3f] hover:cursor-pointer transition hover:scale-110"
                                >
                                    <Trash2Icon size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* 🔥 IMAGE PREVIEW MODAL */}
                {preview && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 transition-all duration-300"
                        onClick={() => setPreview(null)}
                    >
                        <div
                            className="relative animate-[fadeIn_0.3s_ease] scale-95 animate-[zoomIn_0.3s_ease_forwards]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={preview}
                                alt=""
                                className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl"
                            />

                            <button
                                onClick={() => setPreview(null)}
                                className="absolute -top-4 -right-4 bg-white dark:bg-neutral-800 text-black dark:text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:scale-110 hover:cursor-pointer transition"
                            >
                                <X />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {renameModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition">
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl w-80 shadow-xl animate-[fadeIn_0.3s_ease] animate-[zoomIn_0.3s_ease_forwards]">
                        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
                            Rename Folder
                        </h2>

                        <input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full p-2 border rounded-lg mb-4 bg-white dark:bg-neutral-700 text-black dark:text-white"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setRenameModal(null)}
                                className="px-4 py-2 bg-gray-300 dark:bg-neutral-500 rounded-lg hover:bg-gray-400 dark:hover:bg-neutral-600 transition hover:cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={renameFolder}
                                disabled={renameLoading}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition hover:cursor-pointer"
                            >
                                {renameLoading ? <Spinner /> : <Save />}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {deleteModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl w-80 shadow-xl animate-[fadeIn_0.3s_ease] animate-[zoomIn_0.3s_ease_forwards]">
                        <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">
                            Delete Folder
                        </h2>

                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            Are you sure you want to delete this folder?
                        </p>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setDeleteModal(null)}
                                className="px-4 py-2 bg-gray-300 dark:bg-neutral-500 rounded-lg hover:bg-gray-400 dark:hover:bg-neutral-600 transition hover:cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDelete}
                                disabled={deleteLoading}
                                className="px-4 py-2 bg-[#e93f3f] text-white rounded-lg hover:bg-[#c12e2e] transition hover:cursor-pointer"
                            >
                                {deleteLoading ? <Spinner /> : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {deleteFileModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl w-80 shadow-xl animate-[fadeIn_0.3s_ease] animate-[zoomIn_0.3s_ease_forwards]">
                        <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">
                            Delete File
                        </h2>

                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                            Are you sure you want to delete this file?
                        </p>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setDeleteFileModal(null)}
                                className="px-4 py-2 bg-gray-300 dark:bg-neutral-500 rounded-lg hover:bg-gray-400 dark:hover:bg-neutral-600 transition hover:cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDeleteFile}
                                disabled={deleteFileLoading}
                                className="px-4 py-2 bg-[#e93f3f] text-white rounded-lg hover:bg-[#c12e2e] transition hover:cursor-pointer"
                            >
                                {deleteFileLoading ? <Spinner /> : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
