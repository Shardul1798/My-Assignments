"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const admins_model_1 = __importDefault(require("../../database/models/admins.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AdminService {
    async updateAdminPassword(username, oldPassword, newPassword) {
        const responseObj = {
            statusCode: "",
            message: "",
        };
        try {
            const findUser = await admins_model_1.default.findOne({
                where: { username: username },
                raw: true,
            });
            const matchPassword = await bcrypt_1.default.compare(oldPassword, findUser.password);
            if (!matchPassword) {
                responseObj.message = "Wrong Password!";
                responseObj.statusCode = "401";
                return responseObj;
            }
            const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
            if (!hashedPassword) {
                responseObj.message = "Something Went Wrong";
                responseObj.statusCode = "500";
                return responseObj;
            }
            const result = await admins_model_1.default.update({
                password: hashedPassword,
            }, { where: { id: findUser.id } });
            if (result) {
                responseObj.message = "Password ";
            }
        }
        catch (error) {
            responseObj.message = "Something Went Wrong";
            responseObj.statusCode = "500";
            return responseObj;
        }
    }
}
exports.adminService = new AdminService();
