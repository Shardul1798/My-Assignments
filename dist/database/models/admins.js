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
// export default (sequelize, DataTypes) => {
//   return admins;
// };
Admins.init({
    username: sequelize_1.DataTypes.STRING,
    email: sequelize_1.DataTypes.STRING,
    password: sequelize_1.DataTypes.STRING,
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, allowNull: false },
}, {
    sequelize: database_1.default,
    modelName: "Admin",
    tableName: "admins",
});
exports.default = Admins;
