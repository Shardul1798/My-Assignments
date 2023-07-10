// database.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('dev_db', 'postgres', 'myPassword', {
  host: 'localhost',
  dialect: 'postgres'
});

export default sequelize;
