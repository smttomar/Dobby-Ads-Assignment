import { useEffect, useState } from "react";
import API from "../services/api";
import FolderCard from "../components/FolderCard";
import Layout from "../components/Layout";
import { LogOut, Upload, FolderPlus, ImageUp } from "lucide-react";

export default function Dashboard() {
    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);
    const [name, setName] = useState("");
    const [currentFolder, setCurrentFolder] = useState(null);
    const [path, setPath] = useState([]);
    const [loading, setLoading] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);

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
            await API.post("/folders", {
                name,
                parent: currentFolder,
            });

            setName("");
            fetchFolders();
        } catch {
            alert("Error creating folder");
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
            await API.post("/files", formData);
            fetchFiles();
        } catch {
            alert("Upload failed");
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-gray-100 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">My Drive</h1>

                    <button
                        onClick={() => {
                            setLogoutLoading(true);
                            localStorage.removeItem("token");
                            window.location.href = "/";
                        }}
                        className="bg-zinc-500 text-white px-4 py-2 rounded-lg hover:bg-zinc-600 flex items-center justify-center hover:cursor-pointer"
                    >
                        {logoutLoading ? <Spinner /> : <LogOut size={18} />}
                    </button>
                </div>

                {/* Breadcrumb */}
                <div className="mb-4 flex flex-wrap gap-2 text-sm">
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
                        className="border p-2 rounded-lg w-48"
                        placeholder="Folder name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button
                        onClick={createFolder}
                        className="bg-zinc-500 p-4 text-white px-4 py-2 rounded-lg shadow hover:shadow-2xl cursor-pointer transition hover:scale-105"
                    >
                        <FolderPlus />
                    </button>

                    <label className="bg-[#e93f3f] p-4 text-white px-4 py-2 rounded-lg shadow hover:shadow-2xl cursor-pointer transition hover:scale-105">
                        <ImageUp />
                        <input
                            type="file"
                            onChange={uploadFile}
                            className="hidden"
                        />
                    </label>
                </div>

                {/* Folders */}
                <h2 className="text-lg font-semibold mb-2">Folders</h2>

                {loading ? (
                    <p className="text-gray-400">Loading...</p>
                ) : folders.length === 0 ? (
                    <p className="text-gray-400">No folders here</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                        {folders.map((folder) => (
                            <FolderCard
                                key={folder._id}
                                folder={folder}
                                openFolder={openFolder}
                            />
                        ))}
                    </div>
                )}

                {/* Files */}
                <h2 className="text-lg font-semibold mb-2">Files</h2>

                {files.length === 0 ? (
                    <p className="text-gray-400">No files here</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {files.map((file) => (
                            <div
                                key={file._id}
                                className="bg-white rounded-2xl shadow hover:shadow-xl hover:scale-105 transition duration-200 p-3"
                            >
                                <img
                                    src={`http://localhost:8000/${file.path}`}
                                    alt=""
                                    onClick={() =>
                                        setPreview(
                                            `https://dobby-ads-assignment-1pry.onrender.com/${file.path}`,
                                        )
                                    }
                                    className="h-32 w-full object-cover rounded-lg mb-2 cursor-pointer"
                                />
                                <p className="text-xs text-gray-700 truncate">
                                    {file.name}
                                </p>
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
                        {/* Image Container */}
                        <div
                            className="relative animate-[fadeIn_0.3s_ease] scale-95 animate-[zoomIn_0.3s_ease_forwards]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={preview}
                                alt=""
                                className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl"
                            />

                            {/* Close Button */}
                            <button
                                onClick={() => setPreview(null)}
                                className="absolute -top-4 -right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:scale-110 hover:cursor-pointer transition"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
