import Folder from "../models/Folder.js";
import calculateFolderSize from "../utils/calculateFolderSize.js";

// Create Folder
export const createFolder = async (req, res) => {
    try {
        const { name, parent } = req.body;

        // 🔐 Check parent folder belongs to user
        if (parent) {
            const parentFolder = await Folder.findOne({
                _id: parent,
                user: req.user._id,
            });

            if (!parentFolder) {
                return res
                    .status(403)
                    .json({ message: "Unauthorized parent folder" });
            }
        }

        const folder = await Folder.create({
            name,
            parent: parent || null,
            user: req.user._id,
        });

        res.status(201).json(folder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get User Folders
export const getFolders = async (req, res) => {
    try {
        const folders = await Folder.find({ user: req.user._id });
        res.json(folders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Folder Size
export const getFolderSize = async (req, res) => {
    try {
        const { folderId } = req.params;

        const folder = await Folder.findOne({
            _id: folderId,
            user: req.user._id,
        });

        if (!folder) {
            return res.status(403).json({ message: "Unauthorized folder" });
        }

        const size = await calculateFolderSize(folderId, req.user._id);

        res.json({ folderId, totalSize: size });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
