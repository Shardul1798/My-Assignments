"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fsRouter = void 0;
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const fs_controller_1 = require("../controllers/fs.controller");
const fsuser_auth_1 = require("../middleware/fsuser.auth");
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
//NEW ASSIGNMENT 10.07.23
exports.fsRouter.post("/register", fsuser_auth_1.validateUser, fs_controller_1.fscontroller.registerUser);
exports.fsRouter.post("/login", fs_controller_1.fscontroller.loginUser);
exports.fsRouter.get("/getuser/:id", fs_controller_1.fscontroller.getUserDetails);
exports.fsRouter.get("/update/:id", fs_controller_1.fscontroller.updateUserDetailsById);
exports.fsRouter.delete("/delete/:id", fs_controller_1.fscontroller.dropUser);
