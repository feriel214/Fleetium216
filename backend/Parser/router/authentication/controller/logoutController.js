module.exports = {
    logout : async function(req,res){
        if(req.session.user != null){
            try {
                req.session.destroy();
                res.status(200).send('Logged out');
            } catch (error) {
                console.error(error.message);
                res.status(500).send('something wenet wrong');
            }
        }else{
            res.status(401).send('already unauthorized');
        }
       
    }
}