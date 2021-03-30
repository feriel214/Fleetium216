const { TableQuery } = require("azure-storage");
try {
    var azure = require("azure-storage");
    var connectionString =
      "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
    var tableSvc = azure.createTableService(connectionString);
  } catch (error) {
    console.log("can not connect to azure table storage");
  }


async function deceleration_threshold2_exceed(carId){
    PartitionKey = carId + "_" + "deceleration_threshold2_exceed";
    return new Promise((resolve, reject) => {
    query = new azure.TableQuery()
    .select(['*'])
    .where('PartitionKey eq?', PartitionKey);
   tableSvc.queryEntities('eventsdata',query,null, function (error, result){
          if(!error){
            if(result.entries.length != 0){
              resolve(result.entries.length);
            }else{
              resolve(NaN)
            }
                
          }else{
              reject(error);
          }
        });
      });
}


module.exports = { 
    deceleration_threshold2_exceed
}