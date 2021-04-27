try {
    var azure = require("azure-storage");
    var connectionString = "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
    var tableSvc = azure.createTableService(connectionString);
  } catch (error) {
    console.log("can not connect to azure table storage");
  }

  async function scoresQuery(continuationToken){
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
    async function getScores(){
        let driver = []
        var continuationToken = null;
        do{
            var results =  await scoresQuery( continuationToken);
            continuationToken = results.continuationToken;
            
        }
        while(continuationToken!=null);
        
        for (i = results.entries.length -1 ; i >= 0 ; i--){
            driver.push(results.entries[i]);
          }
          return driver  
          
          
    }
  
  module.exports = {
      getScores
  }