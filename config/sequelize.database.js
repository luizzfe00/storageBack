require('dotenv').config();

const database = {

  development: {
    env: 'development',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql',
    define: {
      timestamps: true
    },
    options: {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
  }
};

module.exports = database[process.env.NODE_ENV || 'development'];