const historyModel = require('../model/historyModel');
const { json } = require('body-parser');

module.exports = {
    getHistory : async function(req,res){
        try {
            result = await historyModel.getHistory(req.body.carId);
            if(result.entries.length != 0){
                res.status(200).json(result.entries);
            }else{
                res.status(404).json({error : true})
            }
        } catch (error) {
           console.error(error.message);
           res.status(500).send('something went wrong'); 
        }

    }
}