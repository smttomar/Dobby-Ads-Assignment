import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
    uploadFile,
    getFiles,
    deleteFile,
} from "../controllers/fileController.js";

const router = express.Router();

router.post("/", protect, upload.single("image"), uploadFile);
router.get("/:folderId", protect, getFiles);
router.delete("/:id", protect, deleteFile);
export default router;
