const mysql = require('mysql')

if (con != null) {

} else {
    var con = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: 'swincomc_20140512_siventas'
        });
        console.log('se realizo conexion con bd')
}

module.exports = con  