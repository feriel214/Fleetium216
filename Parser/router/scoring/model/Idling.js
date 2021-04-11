const { TableQuery } = require("azure-storage");
try {
    var azure = require("azure-storage");
    var connectionString = "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
    var tableSvc = azure.createTableService(connectionString);
  } catch (error) {
    console.log("can not connect to azure table storage");
  }

  async function IdlingQuery(carId,continuationToken,on,off){
    return new Promise((resolve ,reject)=>{
        carId2 = parseInt(carId);
        carId2 = carId2 + 1;
        carId2 = carId2.toString();
        query = new azure.TableQuery()
        .select(['*'])
        .where('PartitionKey ge ? and PartitionKey lt ? and RowKey ge ? and RowKey le ? and gps_speed eq ?',carId,carId2,on,off,'0');
        tableSvc.queryEntities('eventsdata', query, continuationToken, (error, results)=> {
            if(!error){
                resolve(results)           
            }else{
                reject(error);
            }
          });
    
    })
    }
    async function Idling(carId,on,off){
        var continuationToken = null;
        let array = [];
        do{
            var results =  await IdlingQuery(carId, continuationToken,on,off);
            continuationToken = results.continuationToken;
            
        }
        while(continuationToken!=null);
        for (i = 0 ; i < results.entries.length ; i++){
            array[i] = parseInt(results.entries[i].RowKey._);
        }
        return Math.round((Math.max.apply(Math,array) - Math.min.apply(Math,array)) /60);
        
    }
    
    module.exports = {
        Idling
    }
