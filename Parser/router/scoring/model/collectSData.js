require('dotenv').config();

/////////////////////////////////////////////////
//////////////// Azure connection ///////////////
try {
  var azure = require("azure-storage");
  var connectionString = process.env.connectionString;
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
                resolve(results)           
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
        Cornering :0
    }
    res = await ScoreData(carId);
    for(i = 0; i < res.entries.length ; i++){
        date = res.entries[i].Timestamp._.toISOString().slice(0, 10);
        if (date >= debut && date <= fin){
            
                     //roadspeed_1: parseFloat(((parseFloat(res.entries[i].speed_1._)/(parseFloat(res.entries[i].speed_1._)+parseFloat(res.entries[i].speed_2._)+parseFloat(res.entries[i].speed_3._)))*100).toFixed(2)),
                     //roadspeed_2:  parseFloat(((parseFloat(res.entries[i].speed_2._)/(parseFloat(res.entries[i].speed_1._)+parseFloat(res.entries[i].speed_2._)+parseFloat(res.entries[i].speed_3._)))*100).toFixed(2)),
                     data.roadspeed_3 = data.roadspeed_3 + parseFloat(((parseFloat(res.entries[i].speed_3._)/(parseFloat(res.entries[i].speed_1._)+parseFloat(res.entries[i].speed_2._)+parseFloat(res.entries[i].speed_3._)))*100).toFixed(2)),
                     data.Acceleration = data.Acceleration + Math.round(parseFloat(res.entries[i].millage._) / parseFloat(res.entries[i].Vehicle_speed._)),
                     data.Freinage = data.Freinage +  Math.round(parseFloat(res.entries[i].millage._) / parseFloat(res.entries[i].Freinage._)),
                     data.Cornering = data.Cornering + Math.round(parseFloat(res.entries[i].millage._) / parseFloat(res.entries[i].Cornering._))
                
        }
    }
    return data;
    
}
module.exports = {
    collectSData
}