const { reject } = require("async");
const { TableQuery } = require("azure-storage");

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
  
  async function acceleration_threshold1_exceed(carId){
      let arr = [];
      let j = 0;
      
    var continuationToken1 = null;
    var continuationToken2 = null;
    do{
        var results1 =  await ignitionOnQuery(carId, continuationToken1);
        var results2 =  await ignitionOffQuery(carId, continuationToken2);
        continuationToken1 = results1.continuationToken1;
        continuationToken2 = results2.continuationToken2;

        
    }
    while(continuationToken1!=null && continuationToken2!=null);
    for (i = 0 ; i< results1.entries.length ; i++)
    {
        arr[i] = results1.entries[i].RowKey._;
        j++;
    }
    for (i = 0 ; i < results2.entries.length ; i++)
    {
        arr[j] = results2.entries[i].RowKey._
        j++;
    }
    arr.sort()
    let trips=[];
    let trip={};
    let trps=[]
    i=0;
    while (i< arr.length)
     {
         trps.push(arr.slice(i,i+2));      
         i+=2; 
     }
     for( var i in trps){
      console.log('********************* Trip treatment ***********************',trps[i])
      trip.PartitionKey=carId;
      trip.RowKey=trps[i][0];
      trip.ignition_on=trps[i][0];
      trip.ignition_off=trps[i][1];
      trps.arret=trps.length/2;
      trip.milleage=await Milleage(trps[i][1])-await Milleage(trps[i][0]);
      //engine run time here by ghaith 
      //trip.engine_run_time=await EGR(trps[i][1],trps[i][0]);
      //Nb Acceleration 
      //Nb Freinage excessif C2
      //Idling   neselou noura ala fazet el tripp 
      console.log(trip)
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
    //ghaith will do the tretement here   tsoff-tson then convert them to minutes 
  })

}
async function InsertTripsCar(trips){
  //here we're gonna insert all the trips and their summaries into scoring in table stotrage 
} 


  acceleration_threshold1_exceed(1);
module.exports = {
  acceleration_threshold1_exceed
}