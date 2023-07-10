import multer from "multer";
import express from "express";
import { fscontroller } from "../controllers/fs.controller";
import { validateUser } from "../middleware/fsuser.auth";


//This is the multer configuration to upload a file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `src/public/uploads/text`); // Specify the directory where you want to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename for the uploaded file
  },
});
const upload = multer({ storage: storage });

export const fsRouter = express.Router();

//Endpoint to upload a file
fsRouter.post("/upload", upload.single("file"), fscontroller.uploadFile);

//Endpoint to create a new file
fsRouter.post("/merge-files", fscontroller.mergeAndCreateFile);

//NEW ASSIGNMENT 10.07.23
fsRouter.post("/register",validateUser ,fscontroller.registerUser);
fsRouter.post("/login", fscontroller.loginUser);
fsRouter.get("/getuser/:id", fscontroller.getUserDetails);
fsRouter.get("/update/:id", fscontroller.updateUserDetailsById);
fsRouter.delete("/delete/:id", fscontroller.dropUser);