var express = require('express')
const cors = require('cors');
var app = express();
var session = require('express-session');
//upload Image testing 
var multer  = require('multer')



var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    console.log('**************************entredDestination ')
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let originalname = file.originalname;

    let ext = originalname.split('.').pop();
    let filename = originalname.split('.').slice(0, -1).join('.');

    cb(null, filename + '-' + Date.now()+'.'+ext)
  }
})
 
var upload = multer({ storage: storage })
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
let RegisterController = require('./authentication/controller/registerController');
let LoginController = require('./authentication/controller/loginController');
let LogoutController = require('./authentication/controller/logoutController');


app.post('/upload',upload.single('photo'),  (req, res) => {
  console.log(req);

  res.send({"status": "success"})
})


app.post('/logout',function(req,res){
  LogoutController.logout(req,res);
})
app.post('/login',function(req,res){
  LoginController.login(req,res);
})
app.post('/register', function(req, res){
  RegisterController.register(req,res)
})

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
app.get('/score/last-score', function (req,res){
  ScoreController.getLastScore(req,res)
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
 app.put('/fences/edit/:id/:param',function(req,res){
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
