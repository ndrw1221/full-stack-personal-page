import { Router } from "express";
import { chat } from "./handlers.js";
import { authenticateToken } from "../../../../middleware/authenticateToken.js";

const router = Router();
router.get("/chat", authenticateToken, chat);

export default router;
