import Admins from "../../database/models/admins.model";
import bcrypt from "bcrypt";
import * as multer from "multer";

class AdminService {

  async updateAdminPassword(username, oldPassword, newPassword) {
    const responseObj = {
      statusCode: "",
      message: "",
    };
    try {
      const findUser: any = await Admins.findOne({
        where: { username: username },
        raw: true,
      });
      const matchPassword = await bcrypt.compare(oldPassword, findUser.password);
      if(!matchPassword) {
        responseObj.message = "Wrong Password!";
        responseObj.statusCode = "401";
        return responseObj;
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      if (!hashedPassword) {
        responseObj.message = "Something Went Wrong";
        responseObj.statusCode = "500";
        return responseObj;
      }
      const result = await Admins.update(
        {
          password: hashedPassword,
        },
        { where: { id: findUser.id } }
      );
      if (result) {
        responseObj.message ="Password "
      }
    } catch (error) {
      responseObj.message = "Something Went Wrong";
      responseObj.statusCode = "500";
      return responseObj;
    }
  }
}

export const adminService = new AdminService();