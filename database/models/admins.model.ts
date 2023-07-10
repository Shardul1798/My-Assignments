import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

export class Admins extends Model {}

Admins.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    username: { type: DataTypes.STRING, unique: true },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Admin",
    tableName: "admins",
  }
);

Admins.sync({ alter: false })
  .then(() => Promise.resolve("alter done"))
  .catch((e) => Promise.reject(e));
export default Admins;
