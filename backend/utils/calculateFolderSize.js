import Folder from "../models/Folder.js";
import File from "../models/File.js";

const calculateFolderSize = async (folderId, userId) => {
    let totalSize = 0;

    // 1. Get files in this folder
    const files = await File.find({
        folder: folderId,
        user: userId,
    });

    for (let file of files) {
        totalSize += file.size;
    }

    // 2. Get subfolders
    const subfolders = await Folder.find({
        parent: folderId,
        user: userId,
    });

    // 3. Recursively calculate size of subfolders
    for (let sub of subfolders) {
        const subSize = await calculateFolderSize(sub._id, userId);
        totalSize += subSize;
    }
    return totalSize;
};

export default calculateFolderSize;
