import multer from "multer";

const multerStorage = multer.memoryStorage();

export const upload = multer({ storage: multerStorage });
