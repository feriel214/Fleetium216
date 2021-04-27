const ScoreModel = require('../model/scoreModel');
const { json } = require('body-parser');

module.exports = {
    getScore : async function(req,res){
        try {
            result = await ScoreModel.calcScore(req.body.carId,req.body.debut,req.body.fin);
            if(result != null){
                res.status(200).json(result);
            }else{
                res.status(404).json({error : true})
            }
            
        } catch (error) {
           console.error(error.message);
           res.status(500).send('something went wrong'); 
        }

    },
    getAllScores : async function(req,res){
        try {
            result = await ScoreModel.getScores();
            if(result != null){
                res.status(200).json(result);
            }else{
                res.status(404).json({error : true});
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send('something went wrong')
        }

    } 
}
