import { Router } from "express";
import { getAllUsers, createUser, getUserByName } from "./handlers.js";

const router = Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:name", getUserByName);

export default router;
