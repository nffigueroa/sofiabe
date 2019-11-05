'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysql = require('../util/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var otherMiddleWare = {
    getCategories: function getCategories(req, res, next) {
        _mysql2.default.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('Call GEN_consultaLLenarComboCategoria()', '', function (err, result) {
                if (err) throw err;
                res.send(JSON.stringify(result[0]));
            });
        });
        next();
    },
    getMarks: function getMarks(req, res, next) {
        _mysql2.default.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('Call GEN_consultaLLenarComboMarca()', '', function (err, result) {
                if (err) throw err;
                res.send(JSON.stringify(result[0]));
            });
        });
        next();
    },
    getPresentations: function getPresentations(req, res, next) {
        _mysql2.default.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('Call GEN_consultaLLenarComboPresentacion()', '', function (err, result) {
                if (err) throw err;
                res.send(JSON.stringify(result[0]));
            });
        });
        next();
    }
};

exports.default = otherMiddleWare;