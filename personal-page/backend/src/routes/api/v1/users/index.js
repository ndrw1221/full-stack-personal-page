import { Router } from "express";
import { getAllUsers, createUser } from "./handlers.js";

const router = Router();

router.post("/", createUser);
router.get("/", getAllUsers);

export default router;
