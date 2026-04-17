import Folder from "../models/Folder.js";
import File from "../models/File.js";

export const handleMCP = async (req, res) => {
    try {
        const { action, name, parent } = req.body;
        // CREATE FOLDER
        if (action === "create_folder") {
            if (!name) {
                return res.status(400).json({ message: "Name required" });
            }

            const folder = await Folder.create({
                name,
                parent: parent || null,
                user: req.user._id,
            });

            return res.json({
                success: true,
                action: "create_folder",
                message: `Folder "${name}" created successfully`,
                data: folder,
            });
        }
        // GET ALL FILES (BONUS TOOL)
        if (action === "get_files") {
            const files = await File.find({
                user: req.user._id,
                folder: parent || null,
            });

            return res.json({
                success: true,
                action: "get_files",
                count: files.length,
                data: files,
            });
        }

        // GET ALL FOLDERS (BONUS TOOL)
        if (action === "get_folders") {
            const folders = await Folder.find({
                user: req.user._id,
                parent: parent || null,
            });

            return res.json({
                success: true,
                action: "get_folders",
                count: folders.length,
                data: folders,
            });
        }
        // UNKNOWN ACTION
        return res.status(400).json({
            success: false,
            message: "Unknown action",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
