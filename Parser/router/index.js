var express = require('express')
const cors = require('cors');
var app = express();

app.use(express.json());
app.use(cors());

var loginController = require('./controller/loginController');
var registerController = require('./controller/registerController');

app.use('/login',loginController.Login);
app.use('/register',registerController.Register);


module.exports = app;
