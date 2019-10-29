import mysql from 'mysql';

const con = mysql.createPool({
host: "localhost",
user: "root",
password: "123123",
database: 'swincomc_20140512_siventas',
connectionLimit : 1000
});
console.log('se realizo conexion con bd')

export default con;