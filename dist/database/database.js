"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// database.ts
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('dev_db', 'postgres', 'myPassword', {
    host: 'localhost',
    dialect: 'postgres'
});
exports.default = sequelize;
