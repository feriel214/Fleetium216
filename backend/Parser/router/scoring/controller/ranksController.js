const ranksModel = require('../model/RanksModel');

module.exports = {
topDriver : async function(req,res){
        try {
            result = await ranksModel.topDriver();
            if(result != 0){
                res.status(200).json(result);
            }
            else{
                res.status(404).json({error : true});
            }
            
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send('something went wrong'); 
    }  
},

topTen : async function(req,res){
    try {
        result = await ranksModel.topTen();
        if(result != 0){
            res.status(200).json(result);
        }
        else{
            res.status(404).json({error : true});
        }     
    } catch (error){
        console.error(error.message);
        res.status(500).send('something went wrong'); 
}  
},

powerSaver : async function(req,res){
    try {
        result = await ranksModel.powerSaver();
        if(result != 0){
            res.status(200).json(result);
        }
        else{
            res.status(404).json({error : true});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('something went wrong'); 
}  
},

topTrip : async function(req ,res){
    try {
        result = await ranksModel.topTrip();
        if (result != 0){
            res.status(200).json(result)
        }else{
            res.status(404).json({error : true});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('something went wrong');
    }
},
natureFriend : async function(req ,res){
    //if(req.session.user != null){
        try {
            result = await ranksModel.natureFriend();
            if(result != 0){
                res.status(200).json(result);
            }else{
                res.status(404).json({error : true});
            }
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send('something went wrong');
        }
    //}else{
      //  res.status(401).send('Unautherized')
    //}
    
}
}