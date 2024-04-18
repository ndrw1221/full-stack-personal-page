import { Router } from "express";
import {
  // getAllUsers,
  // getUserByName,
  // createUser,
  updateUserPhoto,
  // deleteUserByName,
} from "./handlers.js";
import { authenticateToken } from "../../../../middleware/authenticateToken.js";
import { upload } from "../../../../middleware/multerUpload.js";

const router = Router();

router.post(
  "/upload",
  authenticateToken,
  upload.single("photo"),
  updateUserPhoto
);
// router.get("/", getAllUsers);
// router.get("/:name", getUserByName);
// router.post("/", createUser);
// router.delete("/:name", deleteUserByName);

export default router;
