var pool = require('../SQLdatabase/db');
const bcrypt = require('bcrypt');

async function CheckEmailPassword(email,password){
    const query = await pool.query("SELECT * FROM users WHERE user_email = $1",[email]);
    if(query.rows.length === 0){
        return false;
    }else{
        result = await bcrypt.compare(password,query.rows[0].user_password);
        if(result){
            return query;
        }else{
            return false;
        }
    }
}


module.exports = {
    CheckEmailPassword
};