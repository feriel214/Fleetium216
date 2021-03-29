//read file
const fs = require("fs");
const readline = require("readline");
const Codec = require("./router/codec/Codec.js");
const client=require('./router/SQLDatabase/db')
const { checkServerIdentity } = require("tls");
const redis = require("redis");
const { Console } = require("console");
require("dotenv").config();

var azure = require("azure-storage");
const connectionString = "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
var tableService = azure.createTableService(connectionString);
var entGen = azure.TableUtilities.entityGenerator;

/*const redis_client = redis.createClient({
  host: process.env.host,
  port: process.env.port,
  password: process.env.password,
});*/
//Object that contain all device data
let obj = [];
let evt = [];
let l = [];
let Line = [];
/*const readInterface = readline.createInterface({
  input: fs.createReadStream("demo1.txt"),
  output: process.stdout,
  console: false,
});*/
client.connect();
  const fileStream = fs.createReadStream('demo1.txt')
    var rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
var i = 0;
rl.on('line', async (line) => {
	i++;
	processLineByLine(line,i);
});
async function processLineByLine(line,B) {
	/*InsertLogme(line);
	return;*/
  if(!line){
    return;
  }
	Line[B] = line;
	obj[B] = [];
	evt[B] = [];
	//l[B] = [];

    console.log(Line[B],B);
    Line[B].replace("#", "");
    l[B] = Line[B].split(",");
    for (var i in l[B]) {
      switch (true) {
        case l[B][i].indexOf("*TS") > -1:
          let header = l[B][i];
          console.log("header", header);
          obj[B].header = header;
          break;
        //MDmid deviceID
        case i == 1:
          let mdmid = l[B][i];
          console.log("mdmid", mdmid);
          obj[B].mdmid = mdmid;
          //obj.PartitionKey = mdmid;
          //console.log("obj.PartitionKey: ", obj.PartitionKey);
          break;
        //TimeStamp
        case i == 2:
          let timestamp = l[B][i];
          obj[B].timestamp = timestamp;
          //obj.RowKey = timestamp;
          console.log("TimeStamp", timestamp);
          break;
        //Location information LBS or GPS
        //location information provied by LBS
        case l[B][i].indexOf("LBS") > -1:
          obj[B] = await Codec.LBS(l[B][i], obj[B]);
          break;
        //location information using GPS
        case l[B][i].indexOf("GPS") > -1:
          obj[B] = await Codec.GPS(l[B][i], obj[B]);
          break;
        //Millega Data
        case l[B][i].indexOf("MGR") > -1:
          console.log("*****************MGR***************");
          console.log("Milleage : ", l[B][i].replace("MGR:", ""));
          obj[B].milleage = parseInt(l[B][i].replace("MGR:", "")) / 1000;
          break;
        //AD DATA
        case l[B][i].indexOf("ADC") > -1:
          obj[B] = await Codec.ADConvertData(l[B][i], obj[B]);
          break;
        //Geo-fence Data
        case l[B][i].indexOf("GFS") > -1:
          obj[B] = await Codec.GFS(l[B][i], obj[B]);
          break;
        //OBDII DATA
        case l[B][i].indexOf("OBD") > -1:
          obj[B], (evt[B] = await Codec.OBD(l[B][i], obj[B], evt[B]));
          break;
        //Fuel Consumption Data
        case l[B][i].indexOf("FUL") > -1:
          obj[B] = await Codec.Fuel(l[i], obj[B]);
          break;
        //OBDII alarm DATA
        case l[B][i].indexOf("OAL") > -1:
          obj[B], (evt[B] = await Codec.OAL(l[B][i], obj[B], evt[B]));
          break;
        //Harsh Driver behavior data
        case l[B][i].indexOf("HDB") > -1:
          obj[B], (evt[B] = await Codec.HDB(l[B][i], obj[B], evt[B]));
          break;
        //CANBUS J1939 data
        case l[B][i].indexOf("CAN") > -1:
          obj[B] = await Codec.Canbus(l[B][i], obj[B]);
          break;
        // J1708 data
        case l[B][i].indexOf("HVD") > -1:
          obj[B] = await Codec.HVD(l[B][i], obj[B]);
          break;
        //Vehicle identification number(VIN) data
        case l[B][i].indexOf("VIN") > -1:
          obj[B] = await Codec.VIN(l[B][i], obj[B]);
          break;
        // RFID data
        case l[B][i].indexOf("RFI") > -1:
          obj[B] = await Codec.Rfid(l[B][i], obj[B]);
          break;
        //Engine run time data
        case l[B][i].indexOf("EGT") > -1:
          obj[B] = await Codec.EngineRunTime(l[B][i], obj[B]);
          break;
        //EVENT here we will push each event in eventData(AzureStorage)
        case l[B][i].indexOf("EVT") > -1:
          obj[B], (evt[B] = await Codec.EventData(l[B][i], obj[B], evt[B]));
          break;
        //Device Status and Alarms triggered
        case l[B][i].indexOf("STT") > -1:
          obj[B], (evt[B] = await Codec.STT(l[B][i], obj[B], evt[B]));
          break;
      }
    }

    InsertDeviceData(obj[B]);
    
    //return;
    //const res= await checkCar(obj[B].mdmid);
    var res= 1;

      /*if(res === null){
        console.log("This obd dosen't match any car !!") 
    }else {*/
      //Insert event-data in Redis
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! evt',evt[B])
        InsertEvt(evt[B], obj[B],res);
      
      //Insert device-data in Redis
      //InsertDataRedis(obj[B],res);
    
   /* } */
	return;
  //}
}
processLineByLine();
/*
readInterface.on("line", async (line) => {
  line.replace("#", "");
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
        //obj.PartitionKey = mdmid;
        //console.log("obj.PartitionKey: ", obj.PartitionKey);
        break;
      //TimeStamp
      case i == 2:
        let timestamp = l[i];
        obj.timestamp = timestamp;
        //obj.RowKey = timestamp;
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
      //Millega Data
      case l[i].indexOf("MGR") > -1:
        console.log("*****************MGR***************");
        console.log("Milleage : ", l[i].replace("MGR:", ""));
        obj.milleage = parseInt(l[i].replace("MGR:", "")) / 1000;
        break;
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
        obj, (evt = await Codec.OBD(l[i], obj, evt));
        break;
      //Fuel Consumption Data
      case l[i].indexOf("FUL") > -1:
        obj = await Codec.Fuel(l[i], obj);
        break;
      //OBDII alarm DATA
      case l[i].indexOf("OAL") > -1:
        obj, (evt = await Codec.OAL(l[i], obj, evt));
        break;
      //Harsh Driver behavior data
      case l[i].indexOf("HDB") > -1:
        obj, (evt = await Codec.HDB(l[i], obj, evt));
        break;
      //CANBUS J1939 data
      case l[i].indexOf("CAN") > -1:
        obj = await Codec.Canbus(l[i], obj);
        break;
      // J1708 data
      case l[i].indexOf("HVD") > -1:
        obj = await Codec.HVD(l[i], obj);
        break;
      //Vehicle identification number(VIN) data
      case l[i].indexOf("VIN") > -1:
        obj = await Codec.VIN(l[i], obj);
        break;
      // RFID data
      case l[i].indexOf("RFI") > -1:
        obj = await Codec.Rfid(l[i], obj);
        break;
      //Engine run time data
      case l[i].indexOf("EGT") > -1:
        obj = await Codec.EngineRunTime(l[i], obj);
        break;
      //EVENT here we will push each event in eventData(AzureStorage)
      case l[i].indexOf("EVT") > -1:
        obj, (evt = await Codec.EventData(l[i], obj, evt));
        break;
      //Device Status and Alarms triggered
      case l[i].indexOf("STT") > -1:
        obj, (evt = await Codec.STT(l[i], obj, evt));
        break;
    }
  }*/
   /*console.log("exit");
  console.log("########################################################");
  console.log("obj \n", obj);
  await InsertDeviceData(obj);
  
  
  const res= await checkCar(obj.mdmid);

    if(res === null){
      console.log("This obd dosen't match any car !!") 
  }else {
     //Insert event-data in Redis
     console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! evt',evt)
       await InsertEvt(evt, obj,res);
     
     //Insert device-data in Redis
     await InsertDataRedis(obj,res);
   
  } 
 
});*/

function InsertDeviceData(obj) {
  //Table Storage


  //var entGen = azure.TableUtilities.entityGenerator;
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
    function (error, result, response) {
      if (!error) {
        console.log("Adeed succefully in table storage ! ");
      } else {
        InsertDeviceData(obj);
      }
    }
  );
}

function InsertEvt(evt, obj,id_car) {
  const events = getUniqueEvt(Object.values(evt).flat());
  console.log('*****************************************************events',events);
//var tableService = azure.createTableService(connectionString);
  var entGen = azure.TableUtilities.entityGenerator;
  var ent = {};
  //entity.RowKey=obj.timestamp;
  // delete obj.timestamp;
  
  for (var j in events) {
		ent = {};
		ent.PartitionKey = `${id_car}_${events[j]}`;
		ent.RowKey = obj.timestamp.toString();
		for (var i in obj) {
		  ent[i] = entGen.String(obj[i]);
		}
		tableService.insertOrReplaceEntity("eventsdata",ent,function (error, result, response) {
			if (!error) {
			  console.log(" Event Adeed succefully in table storage ! ");
			} else {
			  InsertEvt(evt, obj,id_car)
			}
		  }
		);
  }
}
function InsertLogme(data) {
  //const events = getUniqueEvt(Object.values(evt).flat());
//var tableService = azure.createTableService(connectionString);
  
var t = new Date().getTime();
  var ent = {};
   ent.RowKey = t.toString();
	ent.PartitionKey = t.toString();
  //for (var j in events) {
    ent["data"] = entGen.String(JSON.stringify(data));
    tableService.insertOrReplaceEntity(
      "logme",
      ent,
      function (error, result, response) {
        if (!error) {
          console.log(" Event Adeed succefully in table storage ! ");
        } else {
         // InsertEvt(evt, obj,id_car)
        }
      }
    );
 // }
}
function getUniqueEvt(array) {
  let unique = [];
  array.forEach((element) => {
    if (!unique.includes(element)) {
      unique.push(element);
    }
  });
  return unique;
}


async function checkCar(mdmid) {
  const query = await client.query("SELECT * FROM cars WHERE mdmid  = $1", [
    mdmid,
  ]); 
  if (query.rows.length === 0) {
    return null;readline.clearScreenDown
  } else {
   
    return JSON.parse(query.rows[0].id_car);
    
  }
 
}
function InsertEventRedis(){

}
async function InsertDataRedis(obj,res){
  await redis_client.hmset(
    res,
    ["id_cars",res,
    "header",obj.header,
    "mmid",obj.mdmid,
    "gps-signal", obj.gps_signal,
    "gps-lat",obj.gps_lat,
    "gps-long",obj.gps_long,
    "gps-hdop",obj.gps_hdop,
    "gps-angle", obj.gps_angle,
    "gps-speed",obj.gps_speed,
    "miellage",obj.milleage,
    "adc-power-supply-voltage",obj.adc_external_power_supply_voltage,
    "adc-device-tempreature",obj.adc_device_tempreture,
    "bdc-device-backup-battery-voltage", obj.adc_device_backup_battery_voltage,
    "engine-run-time",obj.egt_value,
    "obd",obj.obd_block1,
    "fuel-consumption", obj.fuel_consumption,
    "vin",obj.vin,
    "event-code",obj.event_code,
    /*"event-mask",obj.event_mask*/], function(err, res) {
   console.log(err);
});
  console.log("added successfully in redis database :)");
 }