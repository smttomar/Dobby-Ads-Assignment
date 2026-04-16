import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    createFolder,
    getFolders,
    getFolderSize,
} from "../controllers/folderController.js";

const router = express.Router();

router.post("/", protect, createFolder);
router.get("/", protect, getFolders);
router.get("/size/:folderId", protect, getFolderSize);
export default router;
