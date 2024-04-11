import { Router } from "express";
import { login, logout, register, me } from "./handlers.js";
import { authenticateToken } from "../../../../middleware/authenticateToken.js";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
// router.get("/me", authenticateToken, me);

export default router;
