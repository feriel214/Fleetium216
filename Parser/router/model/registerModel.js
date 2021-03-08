const pool = require('../SQLdatabase/db');

    async function CheckEmailExist(email){
        const query = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]);
        return query;
    }
    async function Register(fullname,email,password){
        const query = await pool.query("INSERT INTO users(user_fullname,id_customer,user_email,user_password) VALUES($1,$2,$3,$4) RETURNING *",[fullname,1,email,password]);
        return query;
    }
module.exports = {
    CheckEmailExist,
    Register
};