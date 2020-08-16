var Employee = require('../models/employee');

var pool = require ('../database');


function CreateBoss(req, res){
	var params = req.body;
	var user = new Employee(params.fullName, params.functions );

		pool.query("SELECT * FROM boss WHERE fullName = "+"'" + user.fullName + "'",(err, result, fields)=>{
			if(err){
				throw err;
			}
			if(result.length === 0){
				pool.query("INSERT INTO boss (fullName) VALUES("+"'"+user.fullName+"'"+")",(err, result, fields)=>{
					if(err){
						res.status(500).send({message: 'Lo sentimos no se pudo registrar el usuario de tipo Jefe'});
					}
					else{
						res.status(200).send({message: 'El usuario de tipo Jefe se registro correctamente'});
					}
				});
			}else{
				res.status(404).send({message: 'Usuario de tipo Jefe ya esta registrado'});
			}
		});	
}

function GetBoss(req, res){
	pool.query("SELECT * FROM boss",(err, result, fields)=>{
		if(err){
			res.status(500).send({message: 'Lo sentimos no se pudo Consultar los Usuario de tipo Jefe'});
		}
		res.status(200).send({result});
	});
}
module.exports = {
    CreateBoss,
    GetBoss
};