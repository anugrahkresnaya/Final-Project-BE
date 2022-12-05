const {
  DB_USER = "postgres",
<<<<<<< HEAD
  DB_PASSWORD = "postgres",
=======
  DB_PASSWORD = "fendys",
>>>>>>> 19ec1a8 (Adding and Fixing Unit Testing on Authentication and API Error)
  DB_NAME = "db_finalproject",
  DB_HOST = "localhost",
  DB_PORT = "5432",
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres"
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres"
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres"
  }
}
