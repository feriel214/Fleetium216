const { TableQuery } = require("azure-storage");

try {
    var azure = require("azure-storage");
    var connectionString =
      process.env.connectionString;
    var tableSvc = azure.createTableService(connectionString);
  } catch (error) {
    console.log("can not connect to azure table storage");
  }
  
  async function queryEntitiesSegmented(carId , continuationToken){
    PartitionKey = carId + "_" + "angle_rapid_changed_alert";
    return new Promise((resolve,reject)=>{
      query = new azure.TableQuery()
      .select(['*'])
      .where('PartitionKey eq?', PartitionKey);
        tableSvc.queryEntities('eventsdata', query, continuationToken, (error, results)=> {
          if(!error){
              resolve(results); 
          }else{
              reject(error);
          }
        });
    });
}

async function angle_rapid_changed_alert(carId){
  
   
    var continuationToken = null;
    
    do{
        var results =  await queryEntitiesSegmented(carId, continuationToken);
        continuationToken = results.continuationToken;
        
    }
    while(continuationToken!=null);
    return results.entries.length;
  
    
}


  module.exports = {
      angle_rapid_changed_alert
  }