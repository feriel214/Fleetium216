const { TableQuery } = require("azure-storage");

try {
    var azure = require("azure-storage");
    var connectionString =
      process.env.connectionString;
    var tableSvc = azure.createTableService(connectionString);
  } catch (error) {
    console.log("can not connect to azure table storage");
  }

async function queryEntitiesSegmented(carId , continuationToken,on,off){
  PartitionKey = carId + "_" + "undefined";
  return new Promise((resolve,reject)=>{
    query = new azure.TableQuery()
    .select(['*'])
    .where('PartitionKey eq and RowKey >= ? and RowKey <= ?', PartitionKey,on,off);
      tableSvc.queryEntities('eventsdata', query, continuationToken, (error, results)=> {
        if(!error){
            resolve(results); 
        }else{
            reject(error);
        }
      });
  });
}

async function Freinage(carId,on,off){
  var continuationToken = null;
  do{
      var results =  await queryEntitiesSegmented(carId, continuationToken,on,off);
      continuationToken = results.continuationToken;
      
  }
  while(continuationToken!=null);
  return results.entries.length;

  
}

module.exports = { 
  Freinage
}