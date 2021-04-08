try {
    var azure = require("azure-storage");
    var connectionString =
      "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
    var tableSvc = azure.createTableService(connectionString);
  } catch (error) {
    console.log("can not connect to azure table storage");
  }
  
 async function test(){
  let sum = 0.0;
  t = "1_engine_coolant_temperature";
  return new Promise(( resolve, reject) =>{
    query = new azure.TableQuery()
    .select(['*'])
    .where('PartitionKey eq? ' , '1_ignition_off');
    tableSvc.queryEntities('eventsdata',query,null, function (error, result){
      if(!error){
        // for (i = 0 ; i < result.entries.length; i++){
        //  sum = sum + parseFloat(result.entries[i].obd_distance_travled_value._);
        
          resolve(result.entries)
          console.log(result.entries.length)
      //}
          
      }else{
        reject(error);
        
      }
      
    });

  });
   
}  
 async function show(){
  result = await test();
  console.log(result);
}
show();