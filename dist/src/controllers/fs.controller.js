"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fscontroller = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
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
    async registerUser(req, res) {
        try {
            const { email, password, firstName, lastName, gender, dob, name } = req.body;
            const userObj = {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                dob: dob,
                name: name,
                id: (0, uuid_1.v4)(),
            };
            fs_1.default.readFile("src/public/uploads/json/users.json", "utf8", (err, data) => {
                if (err) {
                    console.error("Error :", err);
                }
                const users = JSON.parse(data);
                users.push(userObj);
                fs_1.default.writeFile("src/public/uploads/json/users.json", JSON.stringify(users), (err) => {
                    if (err) {
                        res.status(500).json({ error: "Internal server error!" });
                    }
                    else {
                        res
                            .status(200)
                            .json({ message: "User registered successfully!" });
                    }
                });
            });
        }
        catch (error) {
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            fs_1.default.readFile("src/public/uploads/json/users.json", "utf8", (err, data) => {
                if (err) {
                    console.error("Error :", err);
                }
                const users = JSON.parse(data);
                for (let i = 0; i < users.length; i++) {
                    if (users[i]?.email === email && users[i]?.password === password) {
                        return res.status(200).json({
                            message: "Log in Successfull!",
                            data: [
                                {
                                    name: users[i]?.name,
                                    gender: users[i]?.gender,
                                    dob: users[i]?.dob,
                                },
                            ],
                        });
                    }
                    else {
                        return res.status(401).json({ message: "Invalid Credentials!" });
                    }
                }
            });
        }
        catch (err) {
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }
    getUserDetails(req, res) {
        try {
            const id = req.params.id;
            fs_1.default.readFile("src/public/uploads/json/users.json", "utf8", (err, data) => {
                if (err) {
                    console.error("Error :", err);
                }
                const users = JSON.parse(data);
                for (let i = 0; i < users.length; i++) {
                    if (users[i]?.id === id) {
                        return res.status(200).json({
                            message: "User Details",
                            data: [
                                {
                                    firstName: users[i]?.firstName,
                                    lastName: users[i]?.lastName,
                                    email: users[i].email,
                                    gender: users[i]?.gender,
                                    dob: users[i]?.dob,
                                },
                            ],
                        });
                    }
                    else {
                        return res.status(401).json({ message: "Invalid Credentials!" });
                    }
                }
            });
        }
        catch (err) {
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }
    updateUserDetailsById(req, res) {
        try {
            const id = req.params.id;
            const { firstName, lastName, dob } = req.body;
            let foundUser = false;
            fs_1.default.readFile("src/public/uploads/json/users.json", "utf8", (err, data) => {
                if (err) {
                    console.error("Error :", err);
                }
                const users = JSON.parse(data);
                for (let i = 0; i < users.length; i++) {
                    if (users[i]?.id === id) {
                        console.log(users[i]);
                        foundUser = true;
                        if (firstName)
                            users[i].firstName = firstName;
                        if (lastName)
                            users[i].lastName = lastName;
                        if (dob)
                            users[i].dob = dob;
                        console.log(users[i]);
                        fs_1.default.writeFile("src/public/uploads/json/users.json", JSON.stringify(users), (err) => {
                            if (err) {
                                res.status(500).json({ error: "Internal server error!" });
                            }
                            else {
                                return res.status(200).json({
                                    message: "Updated Successfully!",
                                    data: [
                                        {
                                            firstName: users[i]?.firstName,
                                            lastName: users[i]?.lastName,
                                            email: users[i].email,
                                            gender: users[i]?.gender,
                                            dob: users[i]?.dob,
                                        },
                                    ],
                                });
                            }
                        });
                    }
                }
                if (!foundUser) {
                    return res.status(401).json({ message: "Invalid Credentials!" });
                }
            });
        }
        catch (err) {
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }
    async dropUser(req, res) {
        try {
            const id = req.params.id;
            fs_1.default.readFile("src/public/uploads/json/users.json", "utf8", (err, data) => {
                if (err) {
                    console.error("Error :", err);
                }
                const users = JSON.parse(data);
                for (let i = 0; i < users.length; i++) {
                    if (users[i]?.id === id) {
                        users.splice(i, 1);
                        return res.status(200).json({
                            message: "Removed User Successfully!",
                            data: [],
                        });
                    }
                    else {
                        return res.status(401).json({ message: "User doesn't exist!" });
                    }
                }
            });
        }
        catch (err) {
            return res.status(500).json({ message: "Something went wrong!" });
        }
    }
}
exports.fscontroller = new fsController();
