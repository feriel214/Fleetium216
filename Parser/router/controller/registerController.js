const registerModel = require('../model/registerModel');
const bcrypt = require('bcrypt');
module.exports = {
    Register : async function(req,res){
        
        //if(req.session != null)
        //{
            try {
            const query = await registerModel.CheckEmailExist(req.body.user_email);
            if(query.rows.length === 0){
                const saltRound = 10;
                const salt = await bcrypt.genSalt(saltRound)
                const cryptedPassword = await bcrypt.hash(req.body.user_password,salt);
                const query = await registerModel.Register(req.body.user_fullname,req.body.user_email,cryptedPassword);
                if(query.rows.length === 0){
                    res.status(500).json({error : true});
                }else{
                    res.status(200).json(query.rows[0]);
                }
            }else{
                res.status(409).json({error : true});
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).json({error:true});
        }
    //}else{
       // res.status(401).send('Unauthorized');
    //}
    }
}