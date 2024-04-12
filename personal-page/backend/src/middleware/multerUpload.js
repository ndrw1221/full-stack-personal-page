import multer from "multer";
import fs from "fs";
import path from "path";

const dir = "./uploads";

// Create the "./uploads" directory if it doesn't exist
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, (recursive = true));
}

// Configure Multer to save uploaded files in the "uploads/" directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, req.userName + ".jpg");
  },
});

export const upload = multer({ storage: storage });
