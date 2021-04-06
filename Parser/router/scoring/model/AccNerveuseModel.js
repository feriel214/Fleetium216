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
      PartitionKey = carId + "_" + "acceleration_threshold1_exceed";
      return new Promise((resolve,reject)=>{
        query = new azure.TableQuery()
        .select(['*'])
        .where('PartitionKey eq?', PartitionKey);
          tableSvc.queryEntities('eventsdata', query, continuationToken, (error, results)=> {
            if(!error){
              if(results.entries.length != 0){
                resolve(results);
              }else{
                reject(NaN);
              }    
            }else{
                reject(error);
            }
          });
      });
  }
  
  async function acceleration_threshold1_exceed(carId){
      var tableQuery = new azure.TableQuery();
      
      var continuationToken = null;
      var entities = [];
      do{
          var results =  await queryEntitiesSegmented(carId, continuationToken);
          continuationToken = results.continuationToken;
          
          
      }
      while(continuationToken!=null);
      return results.entries.length;
  }

module.exports = {
  acceleration_threshold1_exceed
}