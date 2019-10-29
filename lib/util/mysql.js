"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mysql = require("mysql");

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var con = _mysql2.default.createPool({
  host: "localhost",
  user: "root",
  password: "123123",
  database: 'swincomc_20140512_siventas',
  connectionLimit: 1000
});
console.log('se realizo conexion con bd');

exports.default = con;