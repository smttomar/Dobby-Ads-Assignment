import File from "../models/File.js";
import Folder from "../models/Folder.js";

// Upload File
export const uploadFile = async (req, res) => {
    try {
        const { folder } = req.body;

        if (folder) {
            const folderExists = await Folder.findOne({
                _id: folder,
                user: req.user._id,
            });

            if (!folderExists) {
                return res.status(403).json({ message: "Unauthorized folder" });
            }
        }

        const file = await File.create({
            name: req.file.originalname,
            path: req.file.path,
            size: req.file.size,
            folder: folder || null,
            user: req.user._id,
        });

        res.status(201).json(file);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Files
export const getFiles = async (req, res) => {
    try {
        const { folderId } = req.params;

        const files = await File.find({
            user: req.user._id,
            folder: folderId || null,
        });

        res.json(files);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete File
export const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;

        const file = await File.findOne({
            _id: id,
            user: req.user._id,
        });

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        await File.deleteOne({ _id: id });

        res.json({ message: "File deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
