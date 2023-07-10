"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admins = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
class Admins extends sequelize_1.Model {
}
exports.Admins = Admins;
Admins.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
    },
    username: { type: sequelize_1.DataTypes.STRING, unique: true },
    email: sequelize_1.DataTypes.STRING,
    password: sequelize_1.DataTypes.STRING,
}, {
    sequelize: database_1.default,
    modelName: "Admin",
    tableName: "admins",
});
Admins.sync({ alter: false })
    .then(() => Promise.resolve("alter done"))
    .catch((e) => Promise.reject(e));
exports.default = Admins;
