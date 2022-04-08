const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  local: {
    username: process.env.LOCAL_DATABASE_USERNAME,
    password: process.env.LOCAL_DATABASE_PASSWORD,
    database: process.env.LOCAL_DATABASE_DBNAME,
    host: process.env.LOCAL_DATABASE_HOST,
    dialect: 'mysql',
    logging: false,
  },
  development: {
    username: process.env.LOCAL_DATABASE_USERNAME,
    password: process.env.LOCAL_DATABASE_PASSWORD,
    database: process.env.LOCAL_DATABASE_DBNAME,
    host: process.env.LOCAL_DATABASE_HOST,
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: process.env.PROD_DATABASE_USERNAME,
    password: process.env.PROD_DATABASE_PASSWORD,
    database: process.env.PROD_DATABASE_DBNAME,
    host: process.env.PROD_DATABASE_HOST,
    dialect: 'mysql',
    logging: false,
  },
  isDev: process.env.NODE_ENV === 'development',
  port: process.env.NODE_ENV === 'development' ? process.env.LOCAL_PORT :  process.env.PORT,
  secret: process.env.SECRET
};
