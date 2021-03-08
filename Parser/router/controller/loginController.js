const CheckEmailPassword = require('../model/loginModel');
var session = require('client-sessions');
module.exports = {
    Login : async function(req,res){
        try {
            const query = await CheckEmailPassword.CheckEmailPassword(req.body.user_email,req.body.user_password);
            if (query.rows.length === 0){
                res.status(401).json({error:true});
            }else{
                req.session = query.rows[0];
                console.log("testing " + req.session.id_user);
                res.status(200).json(query.rows[0]);
            }
       } catch (error) {
            console.error(error.message);
            res.status(500).json({error:true});
        }
    }
}