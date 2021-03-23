var express = require('express')
const cors = require('cors');
const pool = require("./SQLDatabase/db.js");
var app = express();

app.use(express.json());
app.use(cors());

let StorageController = require('./controller/StorageController');
let GeoController = require('./controller/GeoController');


app.get('/login', function (req, res) {
    res.json({login:"true"});
})


// POST /api/users gets JSON bodies
app.get('/2021/:id', function (req, res) {
    StorageController.GetParams(req, res)
})
app.post('/api/geofence', function (req, res) {
  GeoController.createGeo(req, res)
})
//Get GeoFences 
app.get('/api/get/geofence',function(req,res) {
  GeoController.getGeo(req,res);
})
//Edit GeoFences 
app.put('/api/edit/geocars/:id',function(req,res) {
  GeoController.updateGeo(req,res);
})
//Delete GeoFences 
app.delete('/api/delete/geofence/:id',function(req,res) {
  GeoController.DeleteGeo(req,res);
})

app.get('/fences/:id', function (req, res) {
  GeoController.getfence(req,res)
 })

 //update geofence 
 app.put('/fences/edit/:id',function(req,res){
  GeoController.updateFence(req,res)
 })
 //update geofence only pg admin 
app.put('/fences/cars/edit/:id',function(req,res){
  GeoController.updateCarsFence(req,res)
})
   
 //get Cars 
 app.get('/get/cars/fence/:id',function(req,res){
   GeoController.getCars(req,res);
 })


module.exports = app;
