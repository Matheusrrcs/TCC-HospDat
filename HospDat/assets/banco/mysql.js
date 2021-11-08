
var mysql = require('../../consuming_api/node_modules/mysql2');
var valor;

var conexion = mysql.createConnection({
    host: 'localhost',
    database: 'tcc',
    user: 'root',
    password: 'drummerpc@544846'
})

conexion.connect(function (error) {
    if (error) {
        throw error
    }
    else {
        console.log("conectado com sucesso");
    }
})
conexion.query('SELECT nome FROM titulos', function titulos(error, results, fields) {

    if (error) {
        throw error
    }


    results.forEach(result => {
        valor = result.nome
        console.log(result)


    });


})

