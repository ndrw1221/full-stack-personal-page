import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getUserByName,
  deleteUserByName,
} from "./handlers.js";

const router = Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:name", getUserByName);
router.delete("/:name", deleteUserByName);

export default router;
