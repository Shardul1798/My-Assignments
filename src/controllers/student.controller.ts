import Students from "../../database/models/students.model";
import { Op } from "sequelize";
import multer from "multer";

class StudentController {
  
  async getAllStudentsHandler(req, res) {
    try {
      const page = req.query.page;
      const limit = req.query.limit;
      const search = req.query.search;
      let students: any;
      if (!search) {
        students = await Students.findAndCountAll({
          limit: limit,
          raw: true,
        });
      } else {
        students = await Students.findAndCountAll({
          where: {
            [Op.or]: [
              {
                name: { [Op.like]: `%${search}%` },
              },
              {
                email: { [Op.like]: `%${search}%` },
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
      } else {
        res.status(401).json({ error: "Something went wrong!" });
      }
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Something went wrong!" });
    }
  }

  async addStudent(req, res) {
    try {
      const { name, email, course, year, image, gender, age } = req.body;
      const findUser: any = await Students.findOne({
        where: { email: email },
        raw: true,
      });
      if (findUser && findUser.email === email) {
        return res.status(400).json({ error: "Email already exists!" });
      }
      console.log("===================\n", findUser);

      // const hashedPassword = await bcrypt.hash(password, 10);
      const result = await Students.create({
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
      } else {
        res.status(401).json({ error: "Something went wrong!" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateStudentRecordHandler(req, res) {
    try {
      const payload = req.body;
      console.log(payload, req.params.id);
      const rowsUpdated = await Students.update(
        { ...payload },
        { where: { id: req.params.id } }
      );
      console.log(
        "*****************rowsUpdated********************\n\n",
        rowsUpdated
      );
      if (!rowsUpdated)
        return res.status(404).json({ error: "No Record found!" });
      return res
        .status(200)
        .json({ message: "Record Updated Successfully!", data: rowsUpdated });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server error!" });
    }
  }

  async deleteStudentRecordHandler(req, res) {
    try {
      const payload = req.query.id;
      console.log(payload, req.query.id);
      const rowsUpdated = await Students.destroy({
        where: { id: req.params.id },
      });
      console.log(
        "*****************rowsUpdated********************\n\n",
        rowsUpdated
      );
      if (!rowsUpdated)
        return res.status(404).json({ error: "No Record found!" });
      return res
        .status(200)
        .json({ message: "Record Updated Successfully!", data: rowsUpdated });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server error!" });
    }
  }

  async getDetailsById(req, res) {
    try {
      const payload = req.query.id;
      console.log(payload, req.query.id);
      const rows = await Students.findOne({ where: { id: req.params.id } });
      console.log("*****************rows********************\n\n", rows);
      if (!rows) return res.status(404).json({ error: "No Record found!" });
      return res
        .status(200)
        .json({ message: "Record Updated Successfully!", data: rows });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server error!" });
    }
  }

  async uploadStudentImageHandler(req, res) {
    try {
      return res.status(200).json({message: 'Successfully Updated;'});
    } catch(error) {
      return res.status(400).json({message: 'Something is wrong!'})
    }
  }
  
}

export const studentController = new StudentController();
