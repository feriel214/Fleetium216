const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  database: "fleetium216",
  password: "27456520recon",
});


module.exports = pool;