try {
    var azure = require("azure-storage");
    var connectionString = "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
    var tableSvc = azure.createTableService(connectionString);
  } catch (error) {
    console.log("can not connect to azure table storage");
  }

  async function Query(continuationToken){
    
    return new Promise((resolve ,reject)=>{
        query = new azure.TableQuery()
        .select(['*'])
        tableSvc.queryEntities('scorefinal', query, continuationToken, (error, results)=> {
            if(!error){
                resolve(results)           
            }else{
                reject(error);
            }
          });
    
    });
    } 
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
    async function powerSaver(){
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

  async function topTen(){
    var continuationToken = null;
    var driver1 =await topDriver();
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

module.exports = {
  topDriver,
  powerSaver,
  topTen
}