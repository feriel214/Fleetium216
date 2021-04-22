const ranksModel = require('../model/RanksModel');
const { json } = require('body-parser');

module.exports = {
    topDriver : async function(req,res){
        try {
            result = await ranksModel.topDriver();
            if(result != 0){
                res.status(200).json(result);
            }
            else{
                res.status(404).json({error : true})
            }
            
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send('something went wrong'); 
    }  
}
}