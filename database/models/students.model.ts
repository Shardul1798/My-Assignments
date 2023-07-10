import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

export class Students extends Model {}

Students.init(
  {
    name: DataTypes.STRING,
    gender: { type: DataTypes.STRING, allowNull: false, defaultValue: 'MALE' },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    course: DataTypes.STRING,
    year: DataTypes.INTEGER,
    image: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Student",
    tableName: "students",
  }
);-

Students.sync({ alter: false })
  .then(() => Promise.resolve("alter done"))
  .catch((e) => Promise.reject(e));
export default Students;

//auto-incrementing and UUID fast
