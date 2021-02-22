const pool = require("../SQLdatabase/db");

async function Check(mdmid) {
  const query = await pool.query("SELECT * FROM cars WHERE mdmid  = $1", [
    mdmid,
  ]);
  if (query.rows.length === 0) {
    return null;
  } else {
    return JSON.parse(query.rows[0].id_car);
  }
}
module.exports = Check;
