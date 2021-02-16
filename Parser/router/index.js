

var express = require('express')
var app = express();

let StorageController = require('./controller/StorageController');


app.get('/login', function (req, res) {
    res.json({login:"true"});
})

// POST /api/users gets JSON bodies
app.get('/2021/:id', function (req, res) {
    StorageController.GetParams(req, res)
})

module.exports = app;
