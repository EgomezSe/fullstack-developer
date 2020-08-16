
const {
    createPool
}  = require('mysql');

const pool = createPool({
    host:"localhost",
    user:"root",
    password:"password",
    database:"company",
    connectionLimit: 10
});

function CreateEmployee(fullName, boss_id){
    pool.query("INSERT INTO employee (fullName, boss_id) VALUES("+"'"+fullName+"',"+boss_id+")",(err, result, fields)=>{
        if(err){
            //res.status(500).send({message: 'No se pudo registrar el empleado por favor intente más tarde'});
            throw err;
        }
        //res.status(200).send({message: 'El empleado se registro correctamente'});
        return result;
    });
}

function GetItemTable(table, name){
    var script;
    if(name == null){
        script = "SELECT * FROM " + table;
    }else{
        script = "SELECT * FROM "+ "company."+table +" WHERE fullName = "+"'" + name + "'";
    }
    let a;
    pool.query(script,(err, result, fields)=>{
        if(err){
            throw err;
        }
        a = result;
        console.log(a);
    });
    console.log(a); 
    return a;
}


module.exports = pool;