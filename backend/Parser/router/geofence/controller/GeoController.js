const geoModel =require('../model/GeoModel');
const pool = require("../../SQLDatabase/db.js");
var uuid = require("uuid");
const { query } = require('express');
const { json } = require('body-parser');
module.exports = {
   createGeo : async function(req,res){
     console.log("req body  : ",req.body)
     try{
          
          var geojson = req.body.geojson; //fence data 
          var name = req.body.name;
          var description = req.body.description;
          var time_start = req.body.time_start;
          var time_end = req.body.time_end;
          var rang = req.body.rang;
          var cars = req.body.cars;
          var type_fence =req.body.type_fence;
          var uniqueId = await this.G_uuid();
			if(Array.isArray(geojson.coordinates)){
				geojson.coordinates = JSON.stringify(geojson.coordinates)  ;
			}
          if(await geoModel.createGeofenceRedis(uniqueId,geojson)){
              if(await geoModel.createGeofencePg(uniqueId,name,description,time_start,time_end,rang,cars,type_fence)){
                res.status(200).json(req.body);
              }else{
                res.status(500).json({error:"PG"});
              }
          }else{
            res.status(500).json({error:"Redis"});
          }
      }catch(error){
        console.error(error.message);
        res.status(500).json({error:true});
      }
   },
   G_uuid : async function(){
    var UniqueId = uuid.v4();
    var token = await geoModel.G_uuid(UniqueId);
    console.log("=>"+token);
    if(token){
      this.G_uuid();
    }else{
      return UniqueId;
    }
   },
   getGeo : async function(req,res){
     console.log("req",req)
     try{
        const query= await geoModel.getGeo();
        if(query.rows.length === 0){
          return res.status(200).json({message:'there is no car '});
        }
        if(query.rows.length > 0){
          return res.status(200).json(query.rows);
        }else{
          res.status(500).json({error:true});
        }
     }catch(error){
      console.error(error.message);
      return res.status(500).json({error:true});
    }

   },
   DeleteGeo : async function (req, res) {
     try{
      var id = parseInt(req.params.id);
      pool.query('DELETE FROM geohistory WHERE pkey = $1', [id], (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Car into fence  with ID: ${id} is  deleted ! `)
      })
    
     }catch(error){
        console.error(error.message);
        res.status(500).json({error:true});
    }
  },
  updateGeo : async function (req,res){
    console.log("******************request",req)
    try{
      var id = parseInt(req.params.id);
      var name = req.body.name;
      var description = req.body.description;
      var time_start = req.body.time_start;
      var time_end = req.body.time_end;
      var rang = req.body.rang;
      var cars = req.body.cars; 
      var UniqueId=req.body.id;
      var type_fence =req.body.type_fence;
      if(await geoModel.updateGeo(id,name,description,time_start,time_end,rang,cars,UniqueId,type_fence)){
        res.status(200).json(req.body);
      }else{
        res.status(500).json({error:"PG"});
      } 
     }catch(error){
        console.error(error.message);
        return res.status(500).json({error:true});

    }

  },
  getfence : async function(req,res){
        await geoModel.getGeofence(req,res)
      
  },
  updateFence : async function (req,res){
    try{

      var UniqueId=req.params.id;//ID redis 
      var geojson=req.body.geojson;
      var name = req.body.name;
      var description = req.body.description;
      var time_start = req.body.time_start;
      var time_end = req.body.time_end;
      var rang = req.body.rang;
      var cars = req.body.cars; 
      var type_fence=req.body.type_fence;
       if(await geoModel.updateFenceRedis(UniqueId,geojson)){
           if(await geoModel.updateFencePg(UniqueId,name,description,time_start,time_end,rang,cars,type_fence)){
            res.status(200).json({message:'okk update well'});
           }else {
             res(500,json({message:'pg error'}))
           }
       }else {
         res(500,json({message:'error redis '}))
       }
     }catch(error){
        console.error(error.message);
        res.status(500).json({error:true});
    }
  },
  getCars: async function(req,res){
    try{
      const query=await geoModel.getCars(req.params.id);
      if(query.rows.length === 0){
        res.status(200).json({message:'no car in this fence '})
      }
      if(query.rows.length >0 ){
        res.status(200).json(query.rows)
      }
      
    }catch(error){
      console.log(error);
      res.status(500).json({error:true});
    }
  },
  updateCarsFence : async function(req,res){
   try{
    var UniqueId = req.params.id;//Id Redis 
    var name = req.body.name;
    var description = req.body.description;
    var time_start = req.body.time_start;
    var time_end = req.body.time_end;
    var rang = req.body.rang;
    var cars = req.body.cars; 
    var type_fence=req.body.type_fence;
    if(await geoModel.updateFencePg(UniqueId,name,description,time_start,time_end,rang,cars,type_fence)){
      
      res.status(200).json({message:'okk update well'});
     }else {
       res(500,json({message:'pg error'}))
     }
   }catch(error){
     console.log(error)
     res.status(500).json({error:true});
   }
  }
}

