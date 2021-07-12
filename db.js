const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  host: "localhost",
  database: "bittybaking",
});

module.exports = pool;
