var azure = require("azure-storage");
const connectionString = "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
var tableService = azure.createTableService(connectionString);
var entGen = azure.TableUtilities.entityGenerator;
module.exports = {
  StartScore : async(id_car,ignition_on,ignition_off)=>{
      var data = {};
      data.PartitionKey = id_car;
      data.RowKey = ignition_on;
      data.ignition_off = ignition_off;
      //data eventsdata
      //data devisedata
      //proccess 
     // data.milleage=(await this.Milleage(ignition_off)-(await this.Milleage(ignition_on)));
    
    this.InsertTripDataScoreAzure(id_car,ignition_on,data);

  },

  InsertTripDataScoreAzure : async(id_car,ignition_on,ignition_off)=>{
    let trip ={
      PartitionKey:id_car.toString(),
      RowKey:ignition_on.toString(),
      ignition_on:ignition_on,
      ignition_off:ignition_off,
      //milleage:(await Milleage(trps[i][1]))-(await Milleage(trps[i][0]))
    }
    tableService.insertOrReplaceEntity(
      "scoredata",
      trip,
      async function (error, result, response) {
        if (!error) {
          console.log("Adeed succefully in score table storage ! ");
        } else {
        timeout(10000);
        InsertTripDataScoreAzure(id_car,ignition_on,ignition_off);
        }
      }
    );
    return;
  },
   Milleage : async(RowKey) =>{
    return new Promise((resolve, reject)=> {
     let  query = new azure.TableQuery().select(['milleage']).where('RowKey eq?', RowKey);
       tableSvc.queryEntities('eventsdata', query,null,(error, results)=>{
             if(!error){
                resolve(results.entries[0].milleage._)
                return  
             }
             if(error)
             {
              reject(error);
              return
             }
          
           })
    
   })

   }  

}