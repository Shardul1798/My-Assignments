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
exports.validateUser = void 0;
const Joi = __importStar(require("joi"));
const moment_1 = __importDefault(require("moment"));
let validateUser = async (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string()
            .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
            .required(),
        password: Joi.string().required().min(8).alphanum(),
        firstName: Joi.string()
            .required()
            .regex(/^[a-zA-Z]+$/),
        lastName: Joi.string()
            .required()
            .regex(/^[a-zA-Z]+$/),
        gender: Joi.string().valid("MALE", "FEMALE").required(),
        dob: Joi.date().less((0, moment_1.default)("2010-01-01").toDate()).required(),
        name: Joi.string().min(2).max(50),
    });
    const result = schema.validate(req.body);
    if (result && result.error) {
        return res.status(400).json({
            error: result.error.details.map(function (el) {
                return el.message;
            }),
        });
    }
    else {
        next();
    }
};
exports.validateUser = validateUser;
