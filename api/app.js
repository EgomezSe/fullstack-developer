
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var employee_routes = require('./routes/employee');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//consigurar cabeceras http


//rutas base
app.use('/api', employee_routes);
module.exports = app;