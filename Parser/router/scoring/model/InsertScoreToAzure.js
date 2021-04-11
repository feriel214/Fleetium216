const Vehicle_speed = require('../model/Vehicle_speed');
const Freinage = require('../model/Freinage');
const RoadSpeed = require('../model/RoadSpeed');
try {
  var azure = require("azure-storage");
  var connectionString = "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
  var tableSvc = azure.createTableService(connectionString);
} catch (error) {
  console.log("can not connect to azure table storage");
}

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

  async function InsertScore(carId,on,off){
  speed = await RoadSpeed.RoadSpeed(carId,on,off);
   var entGen = azure.TableUtilities.entityGenerator;
   var task = {
   PartitionKey: entGen.String(carId),
   RowKey: entGen.String(RowKey()),
   ignition_on : entGen.String(on),
   ignition_off : entGen.String(off),
   Vehicle_speed : entGen.String(JSON.stringify(await Vehicle_speed.Vehicle_speed(carId,on,off))),
   speed_1 : entGen.String(JSON.stringify(speed[0])),
   speed_2 : entGen.String(JSON.stringify(speed[1])),
   speed_3 : entGen.String(JSON.stringify(speed[2])),
  
 };
 return new Promise((resolve,reject)=>{
    tableSvc.insertEntity('scoredata',task, function (error, result, response) {
        if(!error){
          resolve(true)
        }else{
            reject(false)
        }
      });
 });
 }


res = InsertScore("1","1584512459000","1584515346000");
if (res){
  console.log("nice");
}else{
  console.log("thats so sad");
}
 module.exports = {
     InsertScore
 }