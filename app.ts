import bodyParser from "body-parser";
import express, { Express } from "express";
import { Client } from "pg";
import cors from "cors";
import { adminRouter } from "./src/routes/admin.routes";
import { studentRouter } from "./src/routes/student.routes";
import { createValidator } from "express-joi-validation";
import Joi from "joi";
import { fsRouter } from "./src/routes/fs-assignment.routes";

const app: Express = express();
export const secretkey = "shraudl";

// global.publicPath = `${__dirname}/src/public`;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const validater = createValidator();

const querySchema = Joi.object({
  name: Joi.string().required()
});

const port = 6002;
const hostname = "127.0.0.1";

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.use("/admin", adminRouter);
app.use("/student", studentRouter);
app.use("/fs", fsRouter);

app.listen(port, hostname, () => {
  console.log(`[server]: Server is running at http://${hostname}:${port}`);
});

export const client = new Client({
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