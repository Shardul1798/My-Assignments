"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fscontroller = void 0;
const fs_1 = __importDefault(require("fs"));
class fsController {
    uploadFile(req, res) {
        try {
            return res.status(200).json({ message: "Successfully Updated;" });
        }
        catch (error) {
            return res.status(400).json({ message: "Something is wrong!" });
        }
    }
    async mergeAndCreateFile(req, res) {
        try {
            const { filePathOne, filePathTwo } = req.body;
            //reading file one
            fs_1.default.readFile(filePathOne, "utf8", (err, dataFile1) => {
                if (err) {
                    console.error(err);
                    throw err;
                }
                fs_1.default.readFile(filePathTwo, "utf8", (err, dataFile2) => {
                    if (err) {
                        console.error(err);
                    }
                    const contentFileThree = dataFile1 + dataFile2;
                    const fileName = `${Date.now()}-file3.txt`;
                    const newFilePath = `src/public/backup/${fileName}`;
                    fs_1.default.writeFile(newFilePath, contentFileThree, (err) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({ error: err });
                        }
                        return res
                            .status(200)
                            .json({ message: "Created File three Successfully!" });
                    });
                });
            });
        }
        catch (error) {
            return res.status(400).json({ message: "Something is wrong!" });
        }
    }
}
exports.fscontroller = new fsController();
