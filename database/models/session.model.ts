import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

export class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true
    },
    expiryTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Session",
    tableName: "sessions",
  }
);

Session.sync({ alter: false })
  .then(() => Promise.resolve("alter done"))
  .catch((e) => Promise.reject(e));
export default Session;
