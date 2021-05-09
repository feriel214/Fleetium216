//read file
const fs = require("fs");
const readline = require("readline");
const Codec = require("./router/codec/Codec.js");
const client = require('./router/Database/SQLDatabase/db.js')
const { checkServerIdentity } = require("tls");
const redis = require("redis");
require("dotenv").config();
var azure = require("azure-storage");
const { any } = require("async");
const connectionString = "DefaultEndpointsProtocol=https;AccountName=pfe2021;AccountKey=4MudxJfKGSTpZBFzu8AozK9x47mGpvsFOdF2iPnobcJTRlOd7X7jwSFFvppr4atXQoQL07upQHbBzZhd37xBNg==;EndpointSuffix=core.windows.net";
var tableService = azure.createTableService(connectionString);
var entGen = azure.TableUtilities.entityGenerator;

const ClassRedis = require('./router/model/redis')
ClassRedis.INIT();

//Object that contain all device data
let obj = [];
let evt = [];
let l = [];
let Line = [];
let stt=[];
let  ts_stt=[]
let ignitions=[];
client.connect();
  const fileStream = fs.createReadStream('demo1.txt')
    var rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

var lineT = [];
rl.on('line', async (line) => {
	lineT.push(line)
});
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

setTimeout(async ()=>{
	for(var i in lineT){
		processLineByLine(lineT[i],i);
		await timeout(100);
   
	}
}, 5000)

  
async function processLineByLine(line,B) {	
  Line[B] = line;
	obj[B] = [];
	evt[B] = [];
    //console.log(Line[B],B);
    //Line[B].replace('#','');
	
	
    l[B] = Line[B].split(",");
    for (var i in l[B]) {
      switch (true) {
        case l[B][i].indexOf("*TS") > -1:
          let header = l[B][i];
          obj[B].header = header;
          break;
        //MDmid deviceID
        case i == 1:
          let mdmid = l[B][i];
          obj[B].id_car = await checkCar(mdmid);
		   
		   if(typeof(Codec.STT_STATUS) == "undefined" || typeof(Codec.STT_STATUS[obj[B].id_car]) == "undefined"){
				if(typeof(this.STT_STATUS) == "undefined"){
					Codec.STT_STATUS = [];
				}
				Codec.STT_STATUS[obj[B].id_car] = "0";//await ClassRedis.GetIgnToRedis(obj[B].id_car);
			}
		   
		   
          obj[B].mdmid = mdmid;
          break;
        //TimeStamp
        case i == 2:
          if(parseFloat(l[B][i]) == 0){
            obj[B].timestamp = new Date().getTime();
          }else{
            let packetTime = l[B][i].match(/.{1,2}/g);
            var d = new Date(0000000000000);
            d.setFullYear(parseInt("20"+packetTime[5]), (parseInt(packetTime[4])-1), parseInt(packetTime[3]));
            d.setHours(parseInt(packetTime[0]), parseInt(packetTime[1]), parseInt(packetTime[2]));
            obj[B].timestamp = d.getTime();
          }
          obj[B].timestamp = obj[B].timestamp.toString();
          console.log(l[B][i]+'Timestamp', obj[B].timestamp)
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
          console.log("Milleage meter  : ", l[B][i].replace("MGR:", ""));
          obj[B].milleage = parseInt(l[B][i].replace("MGR:", "")) / 1000;//odometer
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
          obj[B] = await Codec.Fuel(l[B][i], obj[B]);
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
        //Engine run time data(seconds)
        case l[B][i].indexOf("EGT") > -1:
          obj[B] = await Codec.EngineRunTime(l[B][i], obj[B]);
          break;
        //EVENT here we will push each event in eventData(AzureStorage)
        case l[B][i].indexOf("EVT") > -1:
          obj[B], evt[B] = await Codec.EventData(l[B][i], obj[B], evt[B]);
          break;
        //Device Status and Alarms triggered
        case l[B][i].indexOf("STT") > -1:
          obj[B], evt[B] = await Codec.STT(l[B][i], obj[B], evt[B],Codec.STT_STATUS);
          break;
      }
    }
	var res = await checkCar(obj[B].mdmid);
	if(res === null){
        console.log("This obd dosen't match any car !!") 
		return;
      }
   ts_stt.push(obj[B].timestamp)
   stt.push(obj[B].stt_device_status)
    InsertDeviceData(obj[B]); 
  
      //Insert event-data in Redis
      delete evt[B].obj;
       //console.log('+++++++++++++++++++++++++++ evt',evt[B])
       InsertEvt(evt[B], obj[B],res); 
      
      //Insert device-data in Redis
     // 
	 
 ClassRedis.InsertDataRedis(obj,res);
}
processLineByLine();
async function processEvents(){
    console.log('*************** processEvents *****************')
    startEndIgnitions();
    console.log(ignitions)
}


function startEndIgnitions(){  
    for (i=0;i<stt.length;i++){
      if(stt[i] == '0'){
       if(stt[i+1]!=undefined && stt[i+1] != '0'){
          ignitions.push({'ignition_on':ts_stt[i+1]})
       }
      }
      if(stt[i]!='0'){
        if(stt[i+1] != undefined && stt[i+1] == '0'){
            ignitions.push({'ignition_off':ts_stt[i+1]})
        }
    }
    }
 }

function InsertDeviceData(obj) {
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
        console.log("Adeed succefully in table storage ! ");
      } else {
		  timeout(10000);
        InsertDeviceData(obj);
      }
    }
  );
}
function flattenObject(ob) {
    var toReturn = {};

    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}
function InsertEvt(evt, obj,id_car) {
  const events = getUniqueEvt(Object.values(evt).flat());// flattenObject(evt);
  console.log('*****************************************************events',events);
//var tableService = azure.createTableService(connectionString);
  var entGen = azure.TableUtilities.entityGenerator;
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
}
function InsertLogme(data) {
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
  const query = await client.query("SELECT * FROM cars WHERE mdmid  = $1", [mdmid]); 
	  if (query.rows.length === 0) {
		return null;
	  } else {
    return JSON.parse(query.rows[0].id_car);
    
  }
 
}