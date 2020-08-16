
var express = require('express');
var EmployeeController = require('../controllers/employee');
var bossController = require('../controllers/boss');

var api = express.Router();

api.get('/probando-controlador', EmployeeController.Pruebas);
api.get('/obtener-empleados', EmployeeController.GetEmployees);
api.post('/crear-empleado', EmployeeController.CreateEmployee);
api.post('/crear-jefes', bossController.CreateBoss);
api.get('/obtener-jefes', bossController.GetBoss);
//api.post('/login', EmployeeController.loginUser);


module.exports = api;