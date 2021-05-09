const pool = require('../../Database/SQLDatabase/db.js');
async function checkEmail(email){
    const result =await pool.query("SELECT * FROM customer WHERE email = $1",[email]);
    return result;
}

async function register(email,password){
    const result =await pool.query("INSERT INTO customer(email,password) VALUES($1,$2) RETURNING *",[email,password]);
    return result;

}
module.exports = {
    checkEmail,
    register
}