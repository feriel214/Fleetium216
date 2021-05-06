/////////////////////////////////////////////////
//////////////// Azure connection ///////////////
require('dotenv').config();
try {
    var azure = require("azure-storage");
    var connectionString = process.env.connectionString;
    var tableSvc = azure.createTableService(connectionString);
  } catch (error) {
    console.log("can not connect to azure table storage");
  }
/////////////////////////////////////////////////
//////////////// History query ///////////////
  async function historyQuery(carId,continuationToken){
    return new Promise((resolve ,reject)=>{
        query = new azure.TableQuery()
        .select(['*'])
        .where('PartitionKey eq ? ',carId);
        tableSvc.queryEntities('scorefinal', query, continuationToken, (error, results)=> {
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