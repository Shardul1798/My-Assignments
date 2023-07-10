"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRouter = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../controllers/student.controller");
const admin_auth_1 = require("../middleware/admin.auth");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `src/public/uploads/images`); // Specify the directory where you want to store uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename for the uploaded file
    },
});
const upload = multer({ storage: storage });
exports.studentRouter = express_1.default.Router();
exports.studentRouter.get("/list", admin_auth_1.validateAuthToken, student_controller_1.studentController.getAllStudentsHandler);
exports.studentRouter.post("/add", admin_auth_1.validateAuthToken, student_controller_1.studentController.addStudent);
exports.studentRouter.patch("/update/:id", admin_auth_1.validateAuthToken, student_controller_1.studentController.updateStudentRecordHandler);
exports.studentRouter.delete("/remove/:id", admin_auth_1.validateAuthToken, student_controller_1.studentController.deleteStudentRecordHandler);
exports.studentRouter.get("/details/:id", admin_auth_1.validateAuthToken, student_controller_1.studentController.getDetailsById);
exports.studentRouter.post("/upload-file", admin_auth_1.validateAuthToken, upload.single("file"), student_controller_1.studentController.uploadStudentImageHandler);
// node --inspect debug.js  / node --inspect-brk debug.js (Task)
//Study about promises all any resolve reject
