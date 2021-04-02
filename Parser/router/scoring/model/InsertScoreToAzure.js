try {
    var azure = require("azure-storage");
    var connectionString =
      "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
    var tableSvc = azure.createTableService(connectionString);
  } catch (error) {
    console.log("can not connect to azure table storage");
  }
  //console.log("Your final score is "+ Math.round(ScoreFinal));
  function RowKey(){
    today = new Date();
    date = today.getFullYear()+""+(today.getMonth()+1)+""+today.getDate();
    time = today.getHours() + "" + today.getMinutes() + ""+ today.getSeconds();
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