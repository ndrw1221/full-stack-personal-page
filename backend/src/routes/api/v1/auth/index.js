import { Router } from "express";
import { login, logout, register, me } from "./handlers.js";
import { authenticateToken } from "../../../../middleware/authenticateToken.js";

const router = Router();

router.get("/me", authenticateToken, me);
router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);

export default router;
