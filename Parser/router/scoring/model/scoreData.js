const Events = require('./Events');
const RoadSpeed = require('./RoadSpeed');
const Idling = require('./Idling');
const Millage = require('./millage');
require('dotenv').config();

/////////////////////////////////////////////////
//////////////// Azure connection ///////////////
try {
  var azure = require("azure-storage");
  var connectionString = "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
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

/////////////////////////////////////////////////////
///////////////////RowKey function//////////////////
function RowKey(){
  today = new Date();
  Hour = (today.getHours() < 10 ? '0' : '') + today.getHours();
  Sec = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
  Min = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
  Year = today.getFullYear()
  Month = ((today.getMonth()+1) < 10 ? '0' : '') + (today.getMonth()+1);
  Day = (today.getDate() < 10 ? '0' : '') + today.getDate();
  date = Year+""+Month+""+Day;
  time = Hour + "" + Min + ""+ Sec;
  dateTime = date+time;
  return dateTime;
}


///////////////////////////////////////////////////
////////////////Inserting score data//////////////
  async function scoreData(carId,on,off){
   dt = await ScoreData(carId,on,off)
   speed = await RoadSpeed.RoadSpeed(dt);
   events = await Events.get_events(dt,carId);
   var entGen = azure.TableUtilities.entityGenerator;
   var task = {
   PartitionKey: entGen.String(carId),
   RowKey: entGen.String(RowKey()),
   ignition_on : entGen.String(on),
   ignition_off : entGen.String(off),
   Vehicle_speed : entGen.String(JSON.stringify(events.speed)),
   Freinage : entGen.String(JSON.stringify(events.freinage)),
   Cornering : entGen.String(JSON.stringify(events.cornering)),
   speed_1 : entGen.String(JSON.stringify(speed.speed_1 )),
   speed_2 : entGen.String(JSON.stringify(speed.speed_2)),
   speed_3 : entGen.String(JSON.stringify(speed.speed_3)),
   millage : entGen.String(JSON.stringify(await Millage.millage(dt,on,off,carId))),
   Idling : entGen.String(JSON.stringify(await Idling.Idling(speed,on,off)))
  
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

////////////////////////////////////////////////////////////
/*res = scoreData("1","1584518355000","1584540410000");
if (res){
  console.log(true);
}else{
  console.log(false);
}*/

 module.exports = {
     scoreData
 }