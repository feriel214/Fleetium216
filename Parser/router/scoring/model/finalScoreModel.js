const Point = require('./PointsModel');

/////////////////////////////////////////////////
//////////////// Azure connection ///////////////
try {
    var azure = require("azure-storage");
    var connectionString = "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
    var tableSvc = azure.createTableService(connectionString);
  } catch (error) {
    console.log("can not connect to azure table storage");
  }
  
  async function calcQuery(carId,continuationToken){
      return new Promise((resolve ,reject)=>{
          query = new azure.TableQuery()
          .select(['*'])
          .where('PartitionKey eq ?',carId);
          tableSvc.queryEntities('scoredata', query, continuationToken, (error, results)=> {
              if(!error){
                  resolve(results);           
              }else{
                  reject(error);
              }
            });
      
      });
  }
  async function ScoreData(carId){
      var continuationToken = null;
      do{
          var results =  await calcQuery(carId,continuationToken);
          continuationToken = results.continuationToken;  
      }
      while(continuationToken!=null);
      return results;
  }
  async function collectSData(carId,debut,fin){
      let data = {
          roadspeed_3 : 0,
          Acceleration :0,
          Freinage :0,
          Cornering :0,
          Idling : 0,
          nbrAcceleration :0,
          nbrFreinage :0,
          nbrCornering :0
      }
      res = await ScoreData(carId);
      if(res.entries.length == 0){
          return null;
      }else{
      for(i = 0; i < res.entries.length ; i++){
          date = res.entries[i].Timestamp._.toISOString().slice(0, 10);
          if (date >= debut && date <= fin){
                       //roadspeed_1: parseFloat(((parseFloat(res.entries[i].speed_1._)/(parseFloat(res.entries[i].speed_1._)+parseFloat(res.entries[i].speed_2._)+parseFloat(res.entries[i].speed_3._)))*100).toFixed(2)),
                       //roadspeed_2:  parseFloat(((parseFloat(res.entries[i].speed_2._)/(parseFloat(res.entries[i].speed_1._)+parseFloat(res.entries[i].speed_2._)+parseFloat(res.entries[i].speed_3._)))*100).toFixed(2)),
                       data.roadspeed_3 = data.roadspeed_3 + parseFloat(((parseFloat(res.entries[i].speed_3._)/(parseFloat(res.entries[i].speed_1._)+parseFloat(res.entries[i].speed_2._)+parseFloat(res.entries[i].speed_3._)))*100).toFixed(2)),
                       data.Acceleration = data.Acceleration + Math.round(parseFloat(res.entries[i].millage._) / parseFloat(res.entries[i].Vehicle_speed._)),
                       data.nbrAcceleration = data.nbrAcceleration + parseInt(res.entries[i].Vehicle_speed._),
                       data.Freinage = data.Freinage +  Math.round(parseFloat(res.entries[i].millage._) / parseFloat(res.entries[i].Freinage._)),
                       data.nbrFreinage =  data.nbrFreinage + parseInt(res.entries[i].Freinage._),
                       data.Cornering = data.Cornering + Math.round(parseFloat(res.entries[i].millage._) / parseFloat(res.entries[i].Cornering._)),
                       data.nbrCornering = data.nbrCornering + parseInt(res.entries[i].Cornering._)
                       data.Idling = data.Idling + parseInt(res.entries[i].Idling._)
                  
          }
      }
      if(data.roadspeed_3 == 0 && data.Acceleration == 0 && data.Freinage == 0 && data.Cornering == 0){
          return null;
      }else{
          return data;
      }
      }
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
  
 async function insertFinalScore(carId,debut,fin,Cornering,SCornering,Freinage,SFreinage,Acceleration,SAcceleration,Idling,Score){
      var entGen = azure.TableUtilities.entityGenerator;
      var task = {
      PartitionKey: entGen.String(carId),
      RowKey: entGen.String(RowKey()), 
      debut : entGen.String(debut),
      fin : entGen.String(fin),
      Cornering : entGen.String(Cornering),
      SCornering : entGen.String(SCornering),
      Freinage : entGen.String(Freinage),
      SFreinage : entGen.String(SFreinage),
      Acceleration : entGen.String(Acceleration),
      SAcceleration : entGen.String(SAcceleration),
      Idling : entGen.String(Idling),
      score : entGen.String(JSON.stringify(Score)),
    };
    return new Promise((resolve,reject)=>{
       tableSvc.insertEntity('scorefinal',task, function (error, result, response) {
           if(!error){
             resolve(true)
           }else{
             reject(false)
           }
         });
    });
    }

async function calcScore(carId,debut,fin){
    result = await collectSData(carId,debut,fin);
    if(result == null)
    {
        return null;
    }else
    {
        SCornering = Point.Cornering((result.Cornering));
        SFreinage = Point.Freinage(result.Freinage);
        SRoadSpeed = Point.RoadSpeed((result.roadspeed_3)/100);
        SAcceleration = Point.Acceleration(result.Acceleration);
        Score = Math.round((SCornering + (SFreinage * 2) + SRoadSpeed + (SAcceleration * 2)) / 7);
        insertFinalScore(carId,debut,fin,result.nbrCornering,SCornering,result.nbrFreinage,SFreinage,result.nbrAcceleration,SAcceleration,result.Idling,Score);
        return {Score, SCornering ,SFreinage , SRoadSpeed , SAcceleration };
    } 
}
module.exports = {
    calcScore
}