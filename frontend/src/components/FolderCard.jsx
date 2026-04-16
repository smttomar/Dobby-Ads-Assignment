import { useEffect, useState } from "react";
import { Folder } from "lucide-react";
import API from "../services/api";

export default function FolderCard({ folder, openFolder }) {
    const [size, setSize] = useState(null);

    useEffect(() => {
        const fetchSize = async () => {
            const res = await API.get(`/folders/size/${folder._id}`);
            setSize(res.data.totalSize);
        };
        fetchSize();
    }, [folder._id]);

    const formatSize = (bytes) => {
        if (!bytes) return "0 MB";
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    };

    return (
        <div
            onClick={() => openFolder(folder)}
            className="p-4 bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer flex items-center gap-3"
        >
            <Folder className="text-blue-500" />
            <div>
                <p className="font-semibold">{folder.name}</p>
                <p className="text-xs text-gray-500">
                    {size === null ? "..." : formatSize(size)}
                </p>
            </div>
        </div>
    );
}
