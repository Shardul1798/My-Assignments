"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.secretkey = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const cors_1 = __importDefault(require("cors"));
const admin_routes_1 = require("./src/routes/admin.routes");
const student_routes_1 = require("./src/routes/student.routes");
const express_joi_validation_1 = require("express-joi-validation");
const joi_1 = __importDefault(require("joi"));
const fs_assignment_routes_1 = require("./src/routes/fs-assignment.routes");
const app = (0, express_1.default)();
exports.secretkey = "shraudl";
// global.publicPath = `${__dirname}/src/public`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const validater = (0, express_joi_validation_1.createValidator)();
const querySchema = joi_1.default.object({
    name: joi_1.default.string().required()
});
const port = 6002;
const hostname = "127.0.0.1";
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/admin", admin_routes_1.adminRouter);
app.use("/student", student_routes_1.studentRouter);
app.use("/fs", fs_assignment_routes_1.fsRouter);
app.listen(port, hostname, () => {
    console.log(`[server]: Server is running at http://${hostname}:${port}`);
});
exports.client = new pg_1.Client({
    user: "postgres",
    host: hostname,
    database: "dev_db",
    password: "myPassword",
    port: 5432,
});
//var let const
//While, do while
//For foreach map map reduce filter
//example for async, single threaded, non-blocking, event driven, dynamic typed
//fibbonaci, binary search
