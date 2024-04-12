import { Router } from "express";
import { authenticateToken } from "../../../../middleware/authenticateToken.js";
import {
  getAllComments,
  createComment,
  deleteCommentById,
} from "./handlers.js";

const router = Router();

router.get("/", getAllComments);
router.post("/", authenticateToken, createComment);
router.delete("/:id", authenticateToken, deleteCommentById);

export default router;
