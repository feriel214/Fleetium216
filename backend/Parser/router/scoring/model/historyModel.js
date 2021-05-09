/////////////////////////////////////////////////
//////////////// Azure connection ///////////////
require('dotenv').config();
const db = require('../../NoSQLDatabase/db.js');


/////////////////////////////////////////////////
//////////////// History query ///////////////
  async function historyQuery(carId,continuationToken){
    return new Promise((resolve ,reject)=>{
        query = new db.azure.TableQuery()
        .select(['*'])
        .where('PartitionKey eq ? ',carId);
        db.tableSvc.queryEntities('scorefinal', query, continuationToken, (error, results)=> {
            if(!error){
                resolve(results)           
            }else{
                reject(error);
            }
          });
    
    });
    } 
///////////////////////////////////////////////////
//////////////// History query call /////////////
    async function getHistory(carId){
        var continuationToken = null;
        do{
            var results =  await historyQuery(carId, continuationToken);
            continuationToken = results.continuationToken;
            
        }
        while(continuationToken!=null);
        return results;
    }
  
  module.exports = {
      getHistory
  }