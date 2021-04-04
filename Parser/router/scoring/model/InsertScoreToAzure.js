require('dotenv').config()
try {
    var azure = require("azure-storage");
    var connectionString =
    process.env.connectionString;
    var tableSvc = azure.createTableService(connectionString);
  } catch (error) {
    console.log("can not connect to azure table storage");
  }
  //console.log("Your final score is "+ Math.round(ScoreFinal));
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
  function InsertScore(carId,FinalScore){
    
   var entGen = azure.TableUtilities.entityGenerator;
   var task = {
   PartitionKey: entGen.String(JSON.stringify(carId)),
   RowKey: entGen.String(RowKey()),
   Score : entGen.String(JSON.stringify(FinalScore))
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

 module.exports = {
     InsertScore
 }