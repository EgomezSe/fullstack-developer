
var Employee = require('../models/employee');

var pool = require ('../database');


function Pruebas(req,res){
	res.status(200).send({
		message: 'probando una accion del controlador de usuarios con api rest con Node y Mongo'
	});
}

function CreateEmployee(req, res){
	var params = req.body;
	var user = new Employee(params.fullName, params.functions );
	if(!(params.boss)){
		pool.query("SELECT * FROM employee WHERE fullName = "+"'" + user.fullName + "'",(err, result, fields)=>{
			if(err){
				throw err;
			}
			if(result.length === 0){
				pool.query("INSERT INTO employee (fullName, boss_id) VALUES("+"'"+user.fullName+"',"+"1"+")",(err, result, fields)=>{
					if(err){
						res.status(500).send({message: 'Lo sentimos no se pudo registrar el empleado'});
					}
					else{
						res.status(200).send({message: 'El empleado se registro correctamente'});
					}
				});
			}else{
				res.status(404).send({message: 'Empleado ya esta registrado'});
			}
		});
	}else{
		pool.query("SELECT * FROM boss WHERE fullName = "+"'" +params.boss+ "'",(err, result, fields)=>{
			if(err){
				res.status(500).send({message: 'Lo sentimos no se pudo registrar el empleado'});
			}
			else{
				console.log(result);
				if(result.length === 0){
					res.status(404).send({message: 'El Jefe ingresado no existe'});
				}else{
					var id_boss = result[0].boss_id;
					pool.query("SELECT * FROM employee WHERE fullName = "+"'" + user.fullName + "'",(err, result, fields)=>{
						if(err){
							throw err;
						}
						if(result.length === 0){
							console.log('no existe');
							pool.query("INSERT INTO employee (fullName, boss_id) VALUES("+"'"+user.fullName+"',"+id_boss+")",(err, result, fields)=>{
								if(err){
									res.status(500).send({message: 'Lo sentimos no se pudo registrar el empleado'});
								}
								else{
									res.status(200).send({message: 'El empleado se registro correctamente'});
								}
							});
						}else{
							res.status(404).send({message: 'Empleado ya esta registrado'});
						}
					});
				}
			}
		});
	}
}

function GetEmployees(req, res){
	pool.query("SELECT emp.fullName as name_employee, bo.fullName as name_boss FROM company.employee emp INNER JOIN company.boss bo ON emp.boss_id = bo.boss_id",(err, result, fields)=>{
		if(err){
			res.status(500).send({message: 'Lo sentimos no se pudo Consultar los empleados'});
		}
		res.status(200).send({result});
	});
}
module.exports = {
	CreateEmployee,
	Pruebas,
	GetEmployees
};