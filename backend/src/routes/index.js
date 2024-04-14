import express from "express";
import users from "./api/v1/users/index.js";
import auth from "./api/v1/auth/index.js";
import comments from "./api/v1/comments/index.js";

const rootRouter = express.Router();

rootRouter.use("/api/v1/users", users);
rootRouter.use("/api/v1/auth", auth);
rootRouter.use("/api/v1/comments", comments);

export default rootRouter;
