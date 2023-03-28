const bcrypt = require('bcrypt');
const registerModel = require('../model/registerModel');

module.exports = {
    register : async function(req,res){
        try {
            const query = await registerModel.checkEmail(req.body.email);
            if(query.rows.length == 0){
                const saltRound = 10;
                const salt =await bcrypt.genSalt(saltRound);
                const cryptedPassword = await bcrypt.hash(req.body.password,salt);
                const query = await registerModel.register(req.body.email,cryptedPassword);
                if(query.rows.length == 0){
                    res.status(500).send({error : true});
                }else{
                    res.status(200).send(query.rows[0]);
                }
            }else{
                res.status(409).send('email already exist');
            }
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send('something went wrong');
        }
    }
}