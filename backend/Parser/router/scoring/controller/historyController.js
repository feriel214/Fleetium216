const historyModel = require('../model/historyModel');

module.exports = {
    getHistory : async function(req,res){
        if(req.session.user != null){
            try {
                result = await historyModel.getHistory(req.body.carId);
                if(result.entries.length != 0){
                    res.status(200).json(result.entries);
                }else{
                    res.status(404).json({error : true});
                }
            } catch (error){
               console.error(error.message);
               res.status(500).send('something went wrong');
            }

        }else{
            res.status(401).send('Unauthorized');
        }
            
    }
}