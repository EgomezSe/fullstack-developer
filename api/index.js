const mysql = require('mysql');
var app = require('./app');

var port = process.env.PORT || 3977;



const conection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"company",
    connectionLimit: 10
});
conection.Promise = global.Promise;

conection.connect((err, res) =>{
    if (err) {
      throw err;
    }else{
        console.log('Connected to the MySQL server.');
        app.listen(port, function(){
            console.log('Escuchando en http://localhost:'+ port);
          });
    }
  });
  conection.end();


