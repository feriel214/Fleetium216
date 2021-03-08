var express = require("express");
var bodyParser = require("body-parser");
const config = require("config");
require("dotenv").config();

const Router = require("./router/index.js");

var app = express();

var session = require('express-session');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(Router);
// setting session

app.use(session({
  cookieName: 'session',
  secret: process.env.secret,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  saveUninitialized: true,
  resave: true,
}));

const PORT = config.get("PORT");

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
