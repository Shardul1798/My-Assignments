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
exports.checkBasicAuthAndValidate = exports.decodeToken = exports.validateAuthToken = exports.generateAuthToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const app_1 = require("../../app");
const Joi = __importStar(require("joi"));
const session_model_1 = __importDefault(require("../../database/models/session.model"));
let generateAuthToken = async function (userId, sessionId) {
    if (!userId) {
        return Promise.reject("Tokenization Error");
    }
    else {
        try {
            //Session ID along with userId
            const token = await jwt.sign({ id: userId, sessionId: sessionId }, app_1.secretkey, {
                expiresIn: "24h",
            });
            return { accessToken: token };
        }
        catch (error) {
            console.log("Tokenization Error");
            return Promise.reject("Authentication failed!");
        }
    }
};
exports.generateAuthToken = generateAuthToken;
let validateAuthToken = async function (req, res, next) {
    try {
        console.log(req.body);
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const [authType, token] = authorization.split(/\s+/);
        if (!token) {
            res
                .status(401)
                .set("WWW-Authenticate", 'Basic realm="Authentication required"')
                .send("Unauthorized");
            return;
        }
        let authorizeToken = await (0, exports.decodeToken)(token);
        if (!authorizeToken) {
            res
                .status(401)
                .set("WWW-Authenticate", 'Basic realm="Authentication required"')
                .send("Unauthorized");
            return;
        }
        const haveSession = await session_model_1.default.findOne({
            where: { id: authorizeToken.sessionId, userId: authorizeToken.id },
            raw: true,
        });
        if (haveSession) {
            next();
            return "validated";
        }
        else {
            return res
                .status(440)
                .send({ message: "Your session has been expired!" });
        }
    }
    catch (error) {
        return res
            .status(401)
            .set("WWW-Authenticate", 'Basic realm="Authentication required"')
            .send("Unauthorized");
    }
};
exports.validateAuthToken = validateAuthToken;
let decodeToken = async function (token) {
    let decodedData = jwt.verify(token, app_1.secretkey);
    if (decodedData) {
        return decodedData;
    }
    else {
        return Promise.reject("Invalid Token!");
    }
};
exports.decodeToken = decodeToken;
let checkBasicAuthAndValidate = async (req, res, next) => {
    try {
        const schema = Joi.object().keys({
            username: Joi.string().required(),
            password: Joi.string().required(),
            // alphanum().min(8).max(25).
        });
        const result = schema.validate(req.body);
        if (result && result.error) {
            return res.status(400).json({
                error: result.error.details.map(function (el) {
                    return el.message;
                }),
            });
        }
        const authorization = req.headers.authorization;
        const [authType, token] = authorization.split(/\s+/);
        if (!token) {
            res
                .status(401)
                .set("WWW-Authenticate", 'Basic realm="Authentication required"')
                .send("Authentication required");
            return;
        }
        let checkFunction = basicAuthFunction(token);
        console.log("______________Test____________\n", checkFunction);
        if (!checkFunction) {
            return res.status(401).json({ message: "Unauthorized!" });
        }
        next();
    }
    catch (Error) {
        console.log(Error);
        res.status(401).json({ message: "Catch error Unauthorized!" });
    }
};
exports.checkBasicAuthAndValidate = checkBasicAuthAndValidate;
let basicAuthFunction = function (access_token) {
    const credentials = Buffer.from(access_token, "base64").toString("ascii");
    const [username, password] = credentials.split(":");
    if (username == "Shardul" && password == "shardul@1797") {
        return true;
    }
    return false;
};
