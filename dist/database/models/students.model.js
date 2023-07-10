"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Students = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
class Students extends sequelize_1.Model {
}
exports.Students = Students;
Students.init({
    name: sequelize_1.DataTypes.STRING,
    gender: { type: sequelize_1.DataTypes.STRING, allowNull: false, defaultValue: 'MALE' },
    email: sequelize_1.DataTypes.STRING,
    password: sequelize_1.DataTypes.STRING,
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1
    },
    course: sequelize_1.DataTypes.STRING,
    year: sequelize_1.DataTypes.INTEGER,
    image: sequelize_1.DataTypes.STRING,
}, {
    sequelize: database_1.default,
    modelName: "Student",
    tableName: "students",
});
-Students.sync({ alter: false })
    .then(() => Promise.resolve("alter done"))
    .catch((e) => Promise.reject(e));
exports.default = Students;
//auto-incrementing and UUID fast
