const pool = require('../../Database/SQLDatabase/db.js');
const bcrypt = require('bcrypt');
async function login(email,password){
    const query = await pool.query("SELECT * FROM customer WHERE email = $1",[email])
    if(query.rows.length != 0){
       
        const result = await bcrypt.compare(password,query.rows[0].password);
        if(result){
            return query.rows[0];
        }else{
            return null;
        }
}
}
module.exports = {
    login
}