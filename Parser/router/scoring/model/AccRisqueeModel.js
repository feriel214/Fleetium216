try {
    var azure = require("azure-storage");
    var connectionString =
      "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
    var tableSvc = azure.createTableService(connectionString);
  } catch (error) {
    console.log("can not connect to azure table storage");
  }

  async function acceleration_threshold2_exceed(carId){
  
    PartitionKey = carId + "_" + "acceleration_threshold2_exceed";
    return new Promise((resolve, reject) => {
     query = new azure.TableQuery()
    .select(['*'])
    .where('PartitionKey eq?', PartitionKey);
     tableSvc.queryEntities('eventsdata',query,null, function (error, result){
            if(!error){
                if(result.entries.length != 0){
                    resolve(result.entries[0].obd_distance_travled_value._);
                }else{
                    resolve(false);
                }
            }else{
                reject(console.log("Something went wrong"));
            }
          });
        });
           
  }
  
  
  module.exports = {
    acceleration_threshold2_exceed
  }