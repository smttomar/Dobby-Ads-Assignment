import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    createFolder,
    getFolders,
    getFolderSize,
    deleteFolder,
    renameFolder,
} from "../controllers/folderController.js";

const router = express.Router();

router.post("/", protect, createFolder);
router.get("/", protect, getFolders);
router.get("/size/:folderId", protect, getFolderSize);
router.delete("/:id", protect, deleteFolder);
router.put("/:id", protect, renameFolder);
export default router;
