const ScoreModel = require('../model/scoreModel');

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
            result = await ScoreModel.getAllScores();
            if(result != null){
                res.status(200).json(result);
            }else{
                res.status(404).json({error : true});
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send('something went wrong')
        }

    },
    getLastScore : async function(req,res){
        try {
            result = await ScoreModel.getLastScore(req.body.carId);
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
