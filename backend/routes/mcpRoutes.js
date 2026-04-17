import express from "express";
import { handleMCP } from "../controllers/mcpController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, handleMCP);

export default router;
