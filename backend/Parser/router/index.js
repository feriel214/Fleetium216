var express = require('express')
const cors = require('cors');
const pool = require("./SQLDatabase/db.js");
var app = express();
var session = require('express-session');
require('dotenv').config();
app.use(express.json());
app.use(cors());
app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false , maxAge: 86400000}
  
}))
let StorageController = require('./geofence/controller/StorageController');
let GeoController = require('./geofence/controller/GeoController');
let ScoreController = require('./scoring/controller/scoreController');
let HistoryController = require('./scoring/controller/historyController');
let RanksController  = require('./scoring/controller/ranksController');



app.get('/ranks/top-driver',function(req,res){
  RanksController.topDriver(req,res)
})

app.get('/ranks/top-ten',function(req,res){
  RanksController.topTen(req,res)
})

app.get('/ranks/nature-friend',function(req,res){
  RanksController.natureFriend(req,res)
})

app.get('/ranks/top-trip',function(req,res){
  RanksController.topTrip(req,res)
})

app.get('/ranks/power-saver',function(req,res){
  RanksController.powerSaver(req,res)
})

app.get('/score/history', function (req,res){
  HistoryController.getHistory(req,res)
})
app.get('/score/all', function (req,res){
  ScoreController.getAllScores(req,res)
})
app.post('/score', function (req,res){
    ScoreController.getScore(req,res)
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
