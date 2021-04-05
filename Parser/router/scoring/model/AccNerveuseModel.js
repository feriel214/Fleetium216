const { TableQuery } = require("azure-storage");

try {
  var azure = require("azure-storage");
  var connectionString =
  process.env.connectionString;
  var tableSvc = azure.createTableService(connectionString);
} catch (error) {
  console.log("can not connect to azure table storage");
}



 async function acceleration_threshold1_exceed(carId){
  PartitionKey = carId + "_" + "acceleration_threshold1_exceed";
  return new Promise((resolve, reject) => {
   query = new azure.TableQuery()
  .select(['*'])
  .where('PartitionKey eq?', PartitionKey);
   tableSvc.queryEntities('eventsdata',query,null, function (error, result){
          if(!error){
            if(result.entries.length != 0){
              resolve(result.entries.length);
            }else{
              reject(NaN);
            }    
          }else{
              reject(error);
          }
        });
      });
    }


module.exports = {
  acceleration_threshold1_exceed
}