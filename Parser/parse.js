//read file
const fs = require("fs");
var async = require("async");
var await = require("await");
const readline = require("readline");
const Codec = require("./router/codec/Codec.js");
//Object that contain all device data
let obj = [];
const readInterface = readline.createInterface({
  input: fs.createReadStream("demo1.txt"),
  output: process.stdout,
  console: false,
});
readInterface.on("line", async (line) => {
  console.log(line);
  let l = line.split(",");
  for (var i in l) {
    switch (true) {
      case l[i].indexOf("*TS") > -1:
        let header = l[i];
        console.log("header", header);
        obj.header = header;
        break;
      //MDmid deviceID
      case i == 1:
        let mdmid = l[i];
        console.log("mdmid", mdmid);
        obj.mdmid = mdmid;
        obj.PartitionKey = mdmid;
        console.log('obj.PartitionKey: ',obj.PartitionKey)
        break;
      //TimeStamp
      case i == 2:
        let timestamp = l[i];
        obj.timestamp = timestamp;
        obj.RowKey = timestamp;
        console.log("TimeStamp", timestamp);
        break;
      //Location information LBS or GPS
      //location information provied by LBS
      case l[i].indexOf("LBS") > -1:
        obj = await Codec.LBS(l[i], obj);
        break;
      //location information using GPS
      case l[i].indexOf("GPS") > -1:
        obj = await Codec.GPS(l[i], obj);
        break;
      //Device Status and Alarms triggered
      case l[i].indexOf("STT") > -1:
        obj = await Codec.STT(l[i], obj);
        break;
      //Millega Data
      case l[i].indexOf("MGR") > -1:
        console.log("Milleage value ", l[i].replace("MGR:", ""));
        obj.milleage = l[i].replace("MGR:", "");
        (obj.milleage = parseInt(obj.milleage) * 1), 60934;break;
      //AD DATA
      case l[i].indexOf("ADC") > -1:
        obj = await Codec.ADConvertData(l[i], obj);
        break;
      //Geo-fence Data
      case l[i].indexOf("GFS") > -1:
        obj = await Codec.GFS(l[i], obj);
        break;
      //OBDII DATA
      case l[i].indexOf("OBD") > -1:
        obj = await Codec.OBD(l[i], obj);
        break;
      //Fuel Consumption Data
      case l[i].indexOf("FUL") > -1:
        obj = await Codec.Fuel(l[i],obj);
        break;
      //OBDII alarm DATA
      case l[i].indexOf("OAL") > -1:
        obj = await Codec.OAL(l[i],obj);
        break;
      //Harsh Driver behavior data
      case l[i].indexOf("HDB") > -1:
        obj = await Codec.HDB(l[i],obj);
        break;
      //CANBUS J1939 data
      case l[i].indexOf("CAN") > -1:
        obj = await Codec.Canbus(l[i],obj);
        break;
      // J1708 data
      case l[i].indexOf("HVD") > -1:
        obj = await Codec.HVD(l[i],obj);
        break;
      //Vehicle identification number(VIN) data
      case l[i].indexOf("VIN") > -1:
        obj = await Codec.VIN(l[i],obj);
        break;
      // RFID data
      case l[i].indexOf("RFI") > -1:
        obj = await Codec.Rfid(l[i],obj);
        break;
      //Engine run time data
      case l[i].indexOf("EGT") > -1:
        obj = await Codec.EngineRunTime(l[i],obj);
        break;
      //EVENT here we will push each event in eventData(AzureStorage)
      case l[i].indexOf("EVT") > -1:
        obj = await Codec.EventData(l[i],obj);
        break;
      //here we call storage insert functions
    }
    console.log("obj in for ", obj);
   
  }
  console.log("exit");
  console.log("########################################################");
  console.log("obj out for ", obj);
  InsertDataAzure(obj);
 
});

function InsertDataAzure(obj) {
  console.log("obj in insert function ",obj)
  //Table Storage
  var azure = require("azure-storage");
  var connectionString =
    "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
  var tableService = azure.createTableService(connectionString);
  var entGen = azure.TableUtilities.entityGenerator;
  var entity = {}; 
  for (var i in obj) {
    entity[i] = entGen.String(obj[i]);
  }
  return tableService.insertOrReplaceEntity(
    "devicedata",
    entity,
    function (error, result, response) {
      if (!error) {
        console.log("Adeed succefully in table storage ! ");
      } else {
        console.log(error);
      }
    }
  );
}
