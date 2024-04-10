import { Router } from "express";
import { getAllUsers, createUser } from "./handlers.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);

export default router;
