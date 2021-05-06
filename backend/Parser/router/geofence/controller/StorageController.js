function GetParams(req, res){
    var params = req.params.id;
    res.json({Params:params});
}

module.exports = {GetParams};