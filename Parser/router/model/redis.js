const { reject } = require("async");
const redis = require("redis");
require("dotenv").config();
module.exports = {
	redis_client : [],
	STT_STATUS : [],
	INIT: async (l, obj) => {
		this.redis_client = redis.createClient({
		  host: process.env.host,
		  port: process.env.port,
		  password: process.env.password,
		});
	},
	InitData: async (l, obj) => {
		/*STT_STATUS
		r.hgetall('*', function(err, results) {
		   if (err) {
			   // do something like callback(err) or whatever
		   } else {
			  // do something with results
			  console.log(results)
		   }
		});*/
	},
	/*InsertDataRedis: async (obj,res)=> {
	  this.redis_client.hmset(
			res,
			["id_cars",res,
			"header",obj.header,
			"mmid",obj.mdmid,
			"gps_signal", obj.gps_signal,
			"gps_lat",obj.gps_lat,
			"gps_long",obj.gps_long,
			"gps_hdop",obj.gps_hdop,
			"gps_angle", obj.gps_angle,
			"gps_speed",obj.gps_speed,
			"miellage",obj.milleage,
			"adc_power_supply_voltage",obj.adc_external_power_supply_voltage,
			"adc_device_tempreature",obj.adc_device_tempreture,
			"adc_device_backup_battery_voltage", obj.adc_device_backup_battery_voltage,
			"engine_run_time",obj.egt_value,
			"obd",obj.obd_block1,
			"fuel_consumption", obj.fuel_consumption,
			"vin",obj.vin,
			"event_code",obj.event_code,
			], function(err, res) {
			   this.INIT();
			   this.InsertDataRedis(obj,res);
			});
	  console.log("added successfully in redis database :)");
	}*/
	InsertDataRedis: async (obj,res)=> {
		var data = []
		for(var t in obj){
			data[t] = obj[t];
		}
	  this.redis_client.hmset(res,data, (err, res)=> {
			   /*this.INIT();
			   this.InsertDataRedis(obj,res);*/
			});
	  console.log("added successfully in redis database :)");
	},
	InsertEvtToRedis: async (res,key,value)=> {
		this.redis_client.hmset(res,key,value, function(err, res) {
			
		   /*this.INIT();
		   this.InsertDataRedis(obj,res);*/
		});
	},
	GetIgnToRedis: async (key)=> {
		return new Promise((resolve, reject) => {
			this.redis_client.hgetall(key, function(err, value) {
				if((typeof(value.last_ign) == "undefined")){
					resolve("0");
				}else{
					resolve(value.last_ign.toString());
				}
			});
		});
	},
	GetPlageIgnitionsRedis : async (key)=>{
		return new Promise((resolve,reject)=>{
			this.redis_client.hgetall(key,(err,value)=>{
				if((typeof(value.last_ignnition_on)=="undefined")){
					resolve('error last_ignnition_on value ')
				}else {
					resolve(value.last_ignnition_on)
				}
				if(err){
				reject(err)
				}
			})
		})
	}
};
