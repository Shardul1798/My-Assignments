"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const admin_auth_1 = require("../middleware/admin.auth");
exports.adminRouter = express_1.default.Router();
exports.adminRouter.post('/login', admin_auth_1.checkBasicAuthAndValidate, admin_controller_1.adminController.loginHandler);
exports.adminRouter.put('/register', admin_auth_1.checkBasicAuthAndValidate, admin_controller_1.adminController.RegisterHandler);
exports.adminRouter.get('/check-user', admin_auth_1.checkBasicAuthAndValidate, admin_controller_1.adminController.checkUserExists);
exports.adminRouter.get('/logout', admin_auth_1.validateAuthToken, admin_controller_1.adminController.logout);
exports.adminRouter.patch('/change-password', admin_auth_1.validateAuthToken, admin_controller_1.adminController.changePassword);
