
const Vehicle_speed = require("./Vehicle_speed");
const Freinage = require("./Freinage");

try {
  var azure = require("azure-storage");
  var connectionString = "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
  var tableSvc = azure.createTableService(connectionString);
} catch (error) {
  console.log("can not connect to azure table storage");
}

async function ignitionOnQuery(carId ,  continuationToken){
    PartitionKey = carId + "_" + "ignition_on";
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
  async function ignitionOffQuery(carId ,  continuationToken){
    PartitionKey = carId + "_" + "ignition_off";
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
  
  async function collect_score_data(carId){
      let arr = [];
      let j = 0;
      let trips=[];
      let trps=[]
      
    var continuationToken1 = null;
    var continuationToken2 = null;
    do{
        var ignition_on =  await ignitionOnQuery(carId, continuationToken1);
        var ignition_off =  await ignitionOffQuery(carId, continuationToken2);
        continuationToken1 = ignition_on.continuationToken1;
        continuationToken2 = ignition_off.continuationToken2;

        
    }
    while(continuationToken1!=null && continuationToken2!=null);
    for (i = 0 ; i< ignition_on.entries.length ; i++)
    {
        arr[i] = ignition_on.entries[i].RowKey._;
        j++;
    }
    for (i = 0 ; i < ignition_off.entries.length ; i++)
    {
        arr[j] = ignition_off.entries[i].RowKey._
        j++;
    }
    arr.sort()
    
    i=0;
    while (i< arr.length)
     {
         trps.push(arr.slice(i,i+2));      
         i+=2; 
     }
    
     for( var i in trps){
      
      console.log('********************* Trip treatment ***********************',trps[i])
      let trip ={
        PartitionKey:carId,
        RowKey:trps[i][0],
        ignition_on:trps[i][0],
        ignition_off:trps[i][1],
        arret:trps.length/2,
        milleage:(await Milleage(trps[i][1]))-(await Milleage(trps[i][0])),
        runTime : (await EGR(trps[i][1],trps[i][0])),
        Vehicle_speed : (await Vehicle_speed.Vehicle_speed(carId,trps[i][0],trps[i][1])),
        Freinage : (await Freinage.Freinage(carId,trps[i][0],trps[i][1]))
      }
      trips.push(trip) 
     }
      console.log(trips)
 
  }
 
  
 async function Milleage(RowKey){
   return new Promise((resolve, reject)=> {
    let  query = new azure.TableQuery().select(['milleage']).where('RowKey eq?', RowKey);
      tableSvc.queryEntities('eventsdata', query,null,(error, results)=>{
            if(!error){
               resolve(results.entries[0].milleage._)
               return  
            }
            if(error)
            {
             reject(error);
             return
            }
         
          })
   
  })
};

async function EGR(tsignoff,tsignon){
  return new Promise ((resolve,reject)=>{
    result = (tsignoff - tsignon) / 60000;
    // we can use Math.round(result) to get a more clear result 
    if(result){
      resolve(result)
    }else{
      reject(error);
    }
  })

}
async function InsertTripsCar(trips){
  //here we're gonna insert all the trips and their summaries into scoring in table stotrage 
} 


  collect_score_data(1);
module.exports = {
  acceleration_threshold1_exceed: collect_score_data
}