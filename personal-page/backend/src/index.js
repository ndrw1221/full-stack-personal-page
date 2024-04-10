import express from "express";
import cors from "cors";
import rootRouter from "./routes/index.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(rootRouter);

const __dirname = dirname(fileURLToPath(import.meta.url));
const frontendDir = path.join(__dirname, "../../frontend/dist");

app.use(express.static(frontendDir));
app.get("*", (req, res) => {
  if (!req.originalUrl.startsWith("/api")) {
    return res.sendFile(path.join(frontendDir, "index.html"));
  }
  return res.status(404).send();
});

app.listen(port, () => {
  console.log(`Example app is listening at http://localhost:${port}`);
});
