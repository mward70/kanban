import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
// Tell dotenv to load the .env file from the root directory

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || '',
    process.env.DB_USER || '',
    process.env.DB_PW || '',
    {
      host: 'localhost',
      dialect: 'postgres',
    }
  );
}

export default sequelize;
