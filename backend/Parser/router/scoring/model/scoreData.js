const Events = require('./EventsModel');
const RoadSpeed = require('./RoadSpeedModel');
const Idling = require('./IdlingModel');
const Millage = require('./millageModel');
const RoadTime = require('./roadTime');
require('dotenv').config()
/////////////////////////////////////////////////
//////////////// Azure connection ///////////////
try {
  var azure = require("azure-storage");
  var connectionString = process.env.connectionString;
  var tableSvc = azure.createTableService(connectionString);
} catch (error) {
  console.log("can not connect to azure table storage");
}


////////////////////////////////////////////////
/////////////// Collecting data ///////////////
async function dataQuery(carId,continuationToken,on,off){
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
  
  });
  } 
  async function ScoreData(carId,on,off){
      var continuationToken = null;
      do{
          var results =  await dataQuery(carId, continuationToken,on,off);
          continuationToken = results.continuationToken;
          
      }
      while(continuationToken!=null);
      return results;
  }


///////////////////////////////////////////////////
////////////////Inserting score data//////////////
  async function scoreData(carId,on,off){
   dt = await ScoreData(carId,on,off);
   console.log('++++++++++++++++++++++++++',typeof(on));

   rt = RoadTime.Calcul(on,off)
   speed = await RoadSpeed.RoadSpeed(dt);
   events = await Events.get_events(dt,carId);
   var entGen = azure.TableUtilities.entityGenerator;
   var task = {
   PartitionKey: entGen.String(carId),
   RowKey: entGen.String(JSON.stringify(Date.now())),
   ignition_on : entGen.String(on),
   ignition_off : entGen.String(off),
   Vehicle_speed : entGen.String(JSON.stringify(events.speed)),
   Freinage : entGen.String(JSON.stringify(events.freinage)),
   Cornering : entGen.String(JSON.stringify(events.cornering)),
   speed_1 : entGen.String(JSON.stringify(speed.speed_1 )),
   speed_2 : entGen.String(JSON.stringify(speed.speed_2)),
   speed_3 : entGen.String(JSON.stringify(speed.speed_3)),
   roadtime_1 :  entGen.String(JSON.stringify(rt.roadTime1)),
   roadtime_2 : entGen.String(JSON.stringify(rt.roadTime2)),
   roadtime_3 : entGen.String(JSON.stringify(rt.roadTime3)),
   millage : entGen.String(JSON.stringify(await Millage.millage(dt,on,off,carId))),
   Idling : entGen.String(JSON.stringify(await Idling.Idling(dt)))
  
 };
 return new Promise((resolve,reject)=>{
    tableSvc.insertEntity('scoredata',task, function (error, result, response) {
        if(!error){
          resolve(JSON.stringify(true))
        }else{
            reject(JSON.stringify(false))
        }
      });
 });
 }
res = scoreData("1","1584518355000","1584540410000");
//res = scoreData("1","1584540412000","1584540429000");
if (res){
  console.log(true);
}else{
  console.log(false);
}

 module.exports = {
     scoreData
 }