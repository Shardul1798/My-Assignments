"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
class Session extends sequelize_1.Model {
}
exports.Session = Session;
Session.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
    },
    expiryTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    modelName: "Session",
    tableName: "sessions",
});
Session.sync({ alter: false })
    .then(() => Promise.resolve("alter done"))
    .catch((e) => Promise.reject(e));
exports.default = Session;
