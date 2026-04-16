import File from "../models/File.js";

// Upload File
export const uploadFile = async (req, res) => {
    try {
        const { folder } = req.body;

        // 🔐 Check folder ownership
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
            name: req.file.filename,
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

// Get Files in Folder
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
