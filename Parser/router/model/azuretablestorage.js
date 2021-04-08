var azure = require("azure-storage");
const connectionString = "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
var tableService = azure.createTableService(connectionString);
var entGen = azure.TableUtilities.entityGenerator;
module.exports = {
   InsertDeviceData: async(obj,timeout) =>{
        //Table Storage
        var entity = {};
        entity.PartitionKey = obj.mdmid.toString();
        entity.RowKey = obj.timestamp.toString();
        for (var i in obj) {
            if(obj[i])
              entity[i] = entGen.String(obj[i]);
        }
        tableService.insertOrReplaceEntity(
          "devicedata",
          entity,
          async function (error, result, response) {
            if (!error) {
              console.log("Device Data Adeed succefully in table storage ! ");
            } else {
            timeout(10000);
              InsertDeviceData(obj);
            }
          });
      },
      getUniqueEvt : async (array)=> {
        let unique = [];
        array.forEach((element) => {
          if (!unique.includes(element)) {
            unique.push(element);
          }
        });
        return unique;
    },
	
    InsertEvt : async (evt, obj,id_car,timeout)=> {
        console.log('*********************** obj+id_car ******************************',obj,id_car);
        console.log('*********************** evt ******************************',evt);
        const events =Object.values(evt).flat();
        console.log('*********************** events of Line ******************************',events);
        var ent = {};
        for (var j in events) {
              ent = {};
              ent.PartitionKey = `${id_car}_${events[j]}`;
              ent.RowKey = obj.timestamp.toString();
              for (var i in obj) {
                ent[i] = entGen.String(obj[i]);
              }
              tableService.insertOrReplaceEntity("eventsdata",ent,async function (error, result, response) {
                  if (!error) {
                    console.log(" Event Adeed succefully in table storage ! ");
                  } else {
                      timeout(10000);
                      InsertEvt(evt, obj,id_car)
                  }
                }
              );
        }
    },
    
};
