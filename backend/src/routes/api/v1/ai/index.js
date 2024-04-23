import { Router } from "express";
import { chat, completion } from "./handlers.js";
import { authenticateToken } from "../../../../middleware/authenticateToken.js";

const router = Router();
router.post("/chat", authenticateToken, chat);
router.post("/completion", authenticateToken, completion);

export default router;
