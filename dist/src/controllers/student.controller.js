"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = void 0;
const students_model_1 = __importDefault(require("../../database/models/students.model"));
const sequelize_1 = require("sequelize");
class StudentController {
    async getAllStudentsHandler(req, res) {
        try {
            const page = req.query.page;
            const limit = req.query.limit;
            const search = req.query.search;
            let students;
            if (!search) {
                students = await students_model_1.default.findAndCountAll({
                    limit: limit,
                    raw: true,
                });
            }
            else {
                students = await students_model_1.default.findAndCountAll({
                    where: {
                        [sequelize_1.Op.or]: [
                            {
                                name: { [sequelize_1.Op.like]: `%${search}%` },
                            },
                            {
                                email: { [sequelize_1.Op.like]: `%${search}%` },
                            },
                        ],
                    },
                });
            }
            if (students) {
                res.json({
                    statusCode: 200,
                    message: "Students List",
                    data: {
                        count: students.count,
                        students: students.rows,
                    },
                });
            }
            else {
                res.status(401).json({ error: "Something went wrong!" });
            }
        }
        catch (error) {
            console.error(error);
            res.status(401).json({ error: "Something went wrong!" });
        }
    }
    async addStudent(req, res) {
        try {
            const { name, email, course, year, image, gender, age } = req.body;
            const findUser = await students_model_1.default.findOne({
                where: { email: email },
                raw: true,
            });
            if (findUser && findUser.email === email) {
                return res.status(400).json({ error: "Email already exists!" });
            }
            console.log("===================\n", findUser);
            // const hashedPassword = await bcrypt.hash(password, 10);
            const result = await students_model_1.default.create({
                name: name,
                email: email,
                course: course,
                year: year,
                image: image,
                // password: hashedPassword,
                gender: gender,
                age: age,
            });
            console.log("===================\n", result);
            if (result) {
                res.json({
                    statusCode: 201,
                    message: "Student created succesfully!",
                    data: result,
                });
            }
            else {
                res.status(401).json({ error: "Something went wrong!" });
            }
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async updateStudentRecordHandler(req, res) {
        try {
            const payload = req.body;
            console.log(payload, req.params.id);
            const rowsUpdated = await students_model_1.default.update({ ...payload }, { where: { id: req.params.id } });
            console.log("*****************rowsUpdated********************\n\n", rowsUpdated);
            if (!rowsUpdated)
                return res.status(404).json({ error: "No Record found!" });
            return res
                .status(200)
                .json({ message: "Record Updated Successfully!", data: rowsUpdated });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server error!" });
        }
    }
    async deleteStudentRecordHandler(req, res) {
        try {
            const payload = req.query.id;
            console.log(payload, req.query.id);
            const rowsUpdated = await students_model_1.default.destroy({
                where: { id: req.params.id },
            });
            console.log("*****************rowsUpdated********************\n\n", rowsUpdated);
            if (!rowsUpdated)
                return res.status(404).json({ error: "No Record found!" });
            return res
                .status(200)
                .json({ message: "Record Updated Successfully!", data: rowsUpdated });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server error!" });
        }
    }
    async getDetailsById(req, res) {
        try {
            const payload = req.query.id;
            console.log(payload, req.query.id);
            const rows = await students_model_1.default.findOne({ where: { id: req.params.id } });
            console.log("*****************rows********************\n\n", rows);
            if (!rows)
                return res.status(404).json({ error: "No Record found!" });
            return res
                .status(200)
                .json({ message: "Record Updated Successfully!", data: rows });
        }
        catch (error) {
            return res.status(500).json({ error: "Internal Server error!" });
        }
    }
    async uploadStudentImageHandler(req, res) {
        try {
            return res.status(200).json({ message: 'Successfully Updated;' });
        }
        catch (error) {
            return res.status(400).json({ message: 'Something is wrong!' });
        }
    }
}
exports.studentController = new StudentController();
