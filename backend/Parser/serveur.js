var express = require('express')
var bodyParser = require('body-parser')
const config = require('config');

const Router = require('./router/index.js');

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(Router);

const PORT = config.get('PORT');


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})

