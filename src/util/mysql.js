import mysql from 'mysql';

const con = mysql.createPool({
host: "localhost",
user: "root",
password: "",
database: 'swincomc_20140512_siventas'
});
console.log('se realizo conexion con bd')

export default con;