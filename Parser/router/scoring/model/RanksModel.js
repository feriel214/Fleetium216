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

module.exports = {
  topDriver,
  powerSaver
}