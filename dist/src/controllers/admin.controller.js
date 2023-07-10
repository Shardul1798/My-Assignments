"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const admins_model_1 = __importDefault(require("../../database/models/admins.model"));
// import * as mongoose from "mongoose";
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_auth_1 = require("../middleware/admin.auth");
const session_model_1 = __importDefault(require("../../database/models/session.model"));
const app_1 = require("../../app");
const jwt = __importStar(require("jsonwebtoken"));
const admin_service_1 = require("../services/admin.service");
class AdminController {
    async checkUserExists(req, res) {
        try {
            const { username } = req.body;
            const result = await admins_model_1.default.findOne({
                where: { username: username },
                raw: true,
            });
            console.log("exist or not ============= ", result);
            if (result && result.username) {
                return res.status(401).json({ message: "User already exists!" });
            }
            return res.status(200).json({ user: "false " });
        }
        catch (error) {
            console.error(`we have an error ====>`, error);
        }
    }
    async loginHandler(req, res) {
        try {
            const { username, password } = req.body;
            const findId = await admins_model_1.default.findOne({
                where: { username: username },
                raw: true,
            });
            const matchPassword = await bcrypt_1.default.compare(password, findId.password);
            if (matchPassword) {
                const result = await admins_model_1.default.findOne({
                    where: { username: username, password: findId.password },
                    raw: true,
                });
                if (result) {
                    const expiryTime = Date.now() + 60 * 60 * 24;
                    const sessionCreate = await session_model_1.default.create({
                        userId: result.id,
                        expiryTime: expiryTime
                    });
                    const resp = await (0, admin_auth_1.generateAuthToken)(result.id, sessionCreate.id);
                    res.json({
                        statusCode: 200,
                        message: "Login successful",
                        data: resp.accessToken,
                    });
                }
                else {
                    res.status(401).json({ error: "Invalid username or password" });
                }
            }
            else {
                res.status(401).json({ error: "Invalid Password!" });
            }
        }
        catch (error) {
            console.error(`we have an error ====>`, error);
        }
    }
    async RegisterHandler(req, res) {
        try {
            const { username, email, password } = req.body;
            const findUser = await admins_model_1.default.findOne({
                where: { username: username },
                raw: true,
            });
            if (findUser.username === username) {
                return res.status(400).json({ error: "User already exists!" });
            }
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            if (!hashedPassword) {
                return res.status(500).json({ error: "Internal Server Error;" });
            }
            const result = await admins_model_1.default.create({
                username: username,
                email: email,
                password: hashedPassword,
            });
            if (!result) {
                return res.status(401).json({ error: "Something went wrong!" });
            }
            return res.json({
                statusCode: 200,
                message: "User Registered Succesfully!",
                data: result,
            });
        }
        catch (errors) {
            return res.status(401).json({ error: errors });
        }
    }
    async logout(req, res) {
        try {
            const authorization = req.headers.authorization;
            const [authType, token] = authorization.split(/\s+/);
            let decodedData = jwt.verify(token, app_1.secretkey);
            if (!token) {
                res
                    .status(401)
                    .set("WWW-Authenticate", 'Basic realm="Authentication required"')
                    .send("Unauthorized");
                return;
            }
            const destroySession = await session_model_1.default.destroy({
                where: { id: decodedData.sessionId },
            });
            console.log("Token Expired => \n", decodedData.sessionId);
            if (destroySession) {
                return res.status(200).json({ message: "Logged out successfully" });
            }
            else {
                return res.status(500).json({ error: "Internal Server error!" });
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async changePassword(req, res) {
        try {
            const { username, oldPassword, newPassword } = req.body;
            const result = await admin_service_1.adminService.updateAdminPassword(username, oldPassword, newPassword);
            if (result) {
                return res.status(200).json({ message: result.message });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Something went wrong!' });
        }
    }
}
exports.adminController = new AdminController();
