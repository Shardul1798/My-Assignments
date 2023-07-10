import express from "express";
import { studentController } from "../controllers/student.controller";
import { validateAuthToken } from "../middleware/admin.auth";
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

export const studentRouter = express.Router();

studentRouter.get(
  "/list",
  validateAuthToken,
  studentController.getAllStudentsHandler
);
studentRouter.post("/add", validateAuthToken, studentController.addStudent);
studentRouter.patch(
  "/update/:id",
  validateAuthToken,
  studentController.updateStudentRecordHandler
);
studentRouter.delete(
  "/remove/:id",
  validateAuthToken,
  studentController.deleteStudentRecordHandler
);
studentRouter.get(
  "/details/:id",
  validateAuthToken,
  studentController.getDetailsById
);
studentRouter.post(
  "/upload-file",
  validateAuthToken,
  upload.single("file"),
  studentController.uploadStudentImageHandler
);

// node --inspect debug.js  / node --inspect-brk debug.js (Task)

//Study about promises all any resolve reject
