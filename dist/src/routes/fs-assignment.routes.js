"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fsRouter = void 0;
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const fs_controller_1 = require("../controllers/fs.controller");
const fs = require("fs");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `src/public/uploads/text`); // Specify the directory where you want to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename for the uploaded file
    },
});
const upload = (0, multer_1.default)({ storage: storage });
exports.fsRouter = express_1.default.Router();
exports.fsRouter.post("/upload", upload.single("file"), fs_controller_1.fscontroller.uploadFile);
exports.fsRouter.post("/merge-files", fs_controller_1.fscontroller.mergeAndCreateFile);
