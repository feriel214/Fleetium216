const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  database: "fleetium216",
  password: "admin",
});

module.exports = pool;