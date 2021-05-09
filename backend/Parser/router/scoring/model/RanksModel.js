/////////////////////////////////////////////////
//////////////// Azure connection ///////////////
require('dotenv').config();
const db = require('../../Database/NoSQLDatabase/db.js');



//////////////////////////////////////////////////////////////////
//////////////// This query select all the scorees //////////////
  async function Query(continuationToken){
    
    return new Promise((resolve ,reject)=>{
        query = new db.azure.TableQuery()
        .select(['*'])
        db.tableSvc.queryEntities('scorefinal', query, continuationToken, (error, results)=> {
            if(!error){
                resolve(results)           
            }else{
                reject(error);
            }
          });
    
    });
    } 
///////////////////////////////////////////////////
//////////////// Top driver query call ///////////
    async function topDriver(){
        let max = 0;
        var continuationToken = null;
        do{
            var results =  await Query(continuationToken);
            continuationToken = results.continuationToken;
            
        }
        while(continuationToken!=null);
        
        for (i = results.entries.length -1 ; i >= 0 ; i--){
          if(parseInt(results.entries[i].score._) > max){
            max = parseInt(results.entries[i].score._);
            driver = results.entries[i];
          }   
        }
        return driver;
    }

///////////////////////////////////////////////////
//////////////// Top power saver query call ///////
  async function topPower(){
      let max = 0;
      var continuationToken = null;
      do{
          var results =  await Query(continuationToken);
          continuationToken = results.continuationToken;
          
      }
      while(continuationToken!=null);
      
      for (i = results.entries.length -1 ; i >= 0 ; i--){
        if(parseInt(results.entries[i].roadspeed_1._) > max){
          max = parseInt(results.entries[i].roadspeed_1._);
          driver = results.entries[i];
        }
            
      }
      return driver;
  }
//////////////////////////////////////////////////////
//////////////// Top nature friend query call ///////
  async function topNature(){
    let min = 999999999999999;
    var continuationToken = null;
    do{
        var results =  await Query(continuationToken);
        continuationToken = results.continuationToken;
        
    }
    while(continuationToken!=null);
    
    for (i = results.entries.length -1 ; i >= 0 ; i--){
      if(parseInt(results.entries[i].Idling._) < min){
        min = parseInt(results.entries[i].Idling._);
        driver = results.entries[i];
      }
          
    }
    return driver;
}

///////////////////////////////////////////////////
//////////////// Top trip query call ///////////
    async function topTrip(){
      let max = 0;
      var continuationtoken = null;
      do{

        var results = await Query(continuationtoken);
        continuationtoken = results.continuationToken;

      }while(continuationtoken != null);
      for (i = results.entries.length -1 ; i >= 0 ; i--){
        if(parseInt(results.entries[i].Millage._) > max){
          max = parseInt(results.entries[i].Millage._);
          driver = results.entries[i];
        }     
      }
      return driver;
    }
  

///////////////////////////////////////////////////
//////////////// Power saver query call //////////
    async function powerSaver(){
      var continuationToken = null;
    var driver1 = await topPower();
      do{
          var results =  await Query(continuationToken);
          continuationToken = results.continuationToken;
          
      }
      while(continuationToken!=null);
      driver2 = getPower(driver1,results);
      driver3 = getPower(driver2,results);
      driver4 = getPower(driver3,results);
      driver5 = getPower(driver4,results);
      driver6 = getPower(driver5,results);
      driver7 = getPower(driver6,results);
      driver8 = getPower(driver7,results);
      driver9 = getPower(driver8,results);
      driver10 = getPower(driver9,results);
      return {driver1,driver2,driver3,driver4,driver5,driver6,driver7,driver8,driver9,driver10}
  }

///////////////////////////////////////////////////
//////////////// Power saver query call //////////
  async function natureFriend(){
    var continuationToken = null;
    var driver1 = await topNature();
      do{
          var results =  await Query(continuationToken);
          continuationToken = results.continuationToken;
          
      }
    while(continuationToken!=null);
    driver2 = getNature(driver1,results);
    driver3 = getNature(driver2,results);
    driver4 = getNature(driver3,results);
    driver5 = getNature(driver4,results);
    driver6 = getNature(driver5,results);
    driver7 = getNature(driver6,results);
    driver8 = getNature(driver7,results);
    driver9 = getNature(driver8,results);
    driver10 = getNature(driver9,results);
    return {driver1,driver2,driver3,driver4,driver5,driver6,driver7,driver8,driver9,driver10}

}

/////////////////////////////////////////////////
//////////////// Top 10 query call /////////////
async function topTen(){
  var continuationToken = null;
  var driver1 = await topDriver();
    do{
        var results =  await Query(continuationToken);
        continuationToken = results.continuationToken;
        
    }
    while(continuationToken!=null);
  driver2 = getMax(driver1,results);
  driver3 = getMax(driver2,results);
  driver4 = getMax(driver3,results);
  driver5 = getMax(driver4,results);
  driver6 = getMax(driver5,results);
  driver7 = getMax(driver6,results);
  driver8 = getMax(driver7,results);
  driver9 = getMax(driver8,results);
  driver10 = getMax(driver9,results);
  return {driver1,driver2,driver3,driver4,driver5,driver6,driver7,driver8,driver9,driver10}

}


////////////////////////////////////////////////////////////////////////////////////////////////////
/////////// This  3 functions are used to get the max values according to the variable cMAX ///////

  function getMax(cMax,results){
    //console.log(parseInt(cMax.score._))
    let max = 0;
    for (i = results.entries.length - 1 ; i >=0 ; i--){
      if(parseInt(results.entries[i].score._) > max && parseInt(results.entries[i].score._) < parseInt(cMax.score._)){
        max = parseInt(results.entries[i].score._);
        driver = results.entries[i];
      }
    }
    return driver;
  }

  function getPower(cMax,results){
    //console.log(parseInt(cMax.score._))
    let max = 0;
    for (i = results.entries.length - 1 ; i >=0 ; i--){
      if(parseInt(results.entries[i].roadspeed_1._) > max && parseInt(results.entries[i].roadspeed_1._) < parseInt(cMax.roadspeed_1._)){
        max = parseInt(results.entries[i].roadspeed_1._);
        driver = results.entries[i];
      }
    }
    return driver;
  }

  function getNature(cMax,results){
    let min = 99999999999;
    for (i = results.entries.length - 1 ; i >=0 ; i--){
      if(parseInt(results.entries[i].Idling._) < min && parseInt(results.entries[i].Idling._) > parseInt(cMax.Idling._)){
        min = parseInt(results.entries[i].Idling._);
        driver = results.entries[i];
      }
    }
    return driver;
  }




module.exports = {
  topDriver,
  powerSaver,
  natureFriend,
  topTen,
  topTrip
}