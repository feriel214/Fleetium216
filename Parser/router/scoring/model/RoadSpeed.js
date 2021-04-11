const { TableQuery } = require("azure-storage");
try {
    var azure = require("azure-storage");
    var connectionString = "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
    var tableSvc = azure.createTableService(connectionString);
  } catch (error) {
    console.log("can not connect to azure table storage");
  }


async function speedQuery(carId,continuationToken,on,off){
return new Promise((resolve ,reject)=>{
    carId2 = parseInt(carId);
    carId2 = carId2 + 1;
    carId2 = carId2.toString();
    query = new azure.TableQuery()
    .select(['*'])
    .where('PartitionKey ge ? and PartitionKey lt ? and RowKey ge ? and RowKey le ?',carId,carId2,on,off);
    tableSvc.queryEntities('eventsdata', query, continuationToken, (error, results)=> {
        if(!error){
            resolve(results)           
        }else{
            reject(error);
        }
      });

})
}


async function speed(carId,on,off){
    var continuationToken = null;
    do{
        var results =  await speedQuery(carId, continuationToken,on,off);
        continuationToken = results.continuationToken;
        
    }
    while(continuationToken!=null);
    return results;
}

  async function RoadSpeed(carId,on,off){
      speed1 = [];
      speed2 = [];
      speed3 = [];
      j = 0;
      k = 0;
      l = 0;
      result1 = await speed(carId,on,off);
        // Speed 0 - 90
      for (i = 0; i < result1.entries.length ; i++)
            {
                if(parseInt(result1.entries[i].gps_speed._) <= 90){
                     
                    speed1[j] = parseInt(result1.entries[i].RowKey._);
                    j++;
                }
            }
        // Speed 90 /120
        for (i = 0; i < result1.entries.length ; i++)
            {
                if(parseInt(result1.entries[i].gps_speed._) >= 90 && (parseInt(result1.entries[i].gps_speed._) <= 120)){
                     
                    speed2[k] = parseInt(result1.entries[i].RowKey._);
                    k++;
                }
            }

        // Speed over 120 
        for (i = 0; i < result1.entries.length ; i++)
            {
                if(parseInt(result1.entries[i].gps_speed._) >= 120){
                    speed3[l] = parseInt(result1.entries[i].RowKey._);
                    l++;
                }
            }

            TimeSpeed1 = Math.round((Math.max.apply(Math,speed1) - Math.min.apply(Math,speed1)) /60);
            TimeSpeed2 = Math.round((Math.max.apply(Math,speed2) - Math.min.apply(Math,speed2)) /60);
            TimeSpeed3 = Math.round((Math.max.apply(Math,speed3) - Math.min.apply(Math,speed3)) /60);
            
            return [TimeSpeed1,TimeSpeed2,TimeSpeed3];
  }
 module.exports = {
     RoadSpeed
}