const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  user: "root",
  password: "YOUR PASSWORD",
  host: "localhost",
  database: "bittybaking",
});

module.exports = pool;
