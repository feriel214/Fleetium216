const pool = require("../../SQLDatabase/db.js");
const redis = require("redis");
const { query } = require("../../SQLDatabase/db.js");
require("dotenv").config();
const redis_client = redis.createClient({
  host: "redis-15701.c9.us-east-1-4.ec2.cloud.redislabs.com",
  port: 15701,
  password: "G2u3mLtpJ7lqmyMZRzrX1YWlZ9DO7EIg",
});
pool.connect();

async function createGeofenceRedis(UniqueId,geojson) {
  
  return new Promise((resolve, reject) => {
        redis_client.hset(`${UniqueId}`,`${geojson.type}`,geojson.coordinates,(err, val) => {
          if (err) {
            reject(err)
            return
          }
          if (val == null) {
            resolve(false)
            return
          }
        
          try {
            resolve(
            //JSON.parse(val)
            resolve(true)
            )
          } catch (ex) {
            resolve(true)
          }
       })
    });
  
}  
async function createGeofencePg(UniqueId,name,description,time_start,time_end,rang,cars,type_fence) {
  var query=new Array();
  for (car in cars) {
    const query1 = await pool.query(
    "INSERT INTO geohistory(id,name,description,time_start,time_end,rang,car,type_fence)"+ 
    "VALUES ($1, $2, $3, $4, $5, $6, $7 , $8) RETURNING *",
    [UniqueId,name,description,time_start,time_end,rang,cars[car],type_fence]);
     query.push(query1);   
    } 
    return query;  
}
async function G_uuid(UniqueId) {
  return new Promise((resolve, reject) => {
    redis_client.get(UniqueId, (err, val) => {
      if (err) {
        reject(err)
        return
       }
       if (val == null) {
        resolve(false)
        return
       }
    
       try {
        resolve(
         //JSON.parse(val)
         resolve(true)
        )
       } catch (ex) {
        resolve(true)
       }
    });
  })
  
 
}
async function  getGeo(){
    const query= await pool.query("SELECT * FROM geohistory"); 
    console.log("query : ",query);
    console.log("query.rows : ",query.rows);
    return query;
}
async function updateGeo(id,name,description,time_start,time_end,rang,cars,UniqueId,type_fence){
  const query = await pool.query(
    "UPDATE geohistory SET id=$8,name=$1,description=$2,time_start=$3,time_end=$4,rang=$5,car=$6,type_fence=$8 WHERE pkey=$7 ",
    [name,description,time_start,time_end,rang,cars,id,UniqueId],type_fence);
    console.log("query rows ",query.rows)
     return query;   
     
} 
async function getGeofence(req,res){
    return new Promise(()=>{
      var id =req.params.id;  
     // var key=req.params.type;
      redis_client.hgetall(`${id}`,(err, val) => {
          if (err) {
            console.log(err)
          }
          if(val != null ){
            return res.status(200).json(val);
          }else {
            return res.status(500).json({error:"Redis"});
          }
         
     });
    })  
}
async function updateFenceRedis(UniqueId,geojson){
  return new Promise((resolve, reject) => {
         geojson.coordinates = JSON.stringify(geojson[0].coordinates);
        redis_client.hset(`${UniqueId}`,`${geojson[0].type}`,geojson.coordinates,(err, val) => {
          if (err) {
            reject(err)
            return
          }
          if (val == null) {
            resolve(false)
            return
          }
        
          try {
            resolve(
            //JSON.parse(val)
            resolve(true)
            )
          } catch (ex) {
            resolve(true)
          }
       })
    });
}
async function updateFencePg(UniqueId,name,description,time_start,time_end,rang,cars,type_fence){
  for(car in cars ){
    const  query=await pool.query('Delete from geohistory where id=$1',[UniqueId]) 
  }
  const res= await this.createGeofencePg(UniqueId,name,description,time_start,time_end,rang,cars,type_fence)
  return res;
}
async function getCars(id){
  const query=pool.query("SELECT car FROM geohistory where id= $1",[id]);
  return query ;
}


module.exports = {
  G_uuid,createGeofenceRedis,createGeofencePg,getGeo,updateGeo,getGeofence,updateFenceRedis,updateFencePg,getCars
};
