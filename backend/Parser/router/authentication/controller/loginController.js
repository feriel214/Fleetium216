const loginModel = require('../model/loginModel');
module.exports = {
    login : async function(req,res){
        try {
        const query = await loginModel.login(req.body.email,req.body.password);
        if(query != null){
            req.session.user = query;
            res.status(200).json(req.session.user);
        }else{
            res.status(401).json({error : true});
        }
        } catch (error) {
            console.error(error.message);
            res.status(500).send('something went wrong');
        }
        
    }
}