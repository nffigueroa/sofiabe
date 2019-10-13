'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysql = require('../util/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _common = require('../util/common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userMiddleware = {
    getUserById: function getUserById(req, res, next) {
        _mysql2.default.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('', [1], function (err, result) {
                res.send(JSON.stringify(result[0]));
            });
        });
    },
    getPasswordByUserName: async function getPasswordByUserName(userName, doLogin) {
        return _mysql2.default.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('Call US_consultasPassword(?)', userName, function (err, result) {
                if (err) throw err;
                doLogin(result[0]);
            });
        });
    },
    getUserProperties: async function getUserProperties(userName, doResponse) {
        return _mysql2.default.getConnection(function (err, connection) {
            connection.query('Call US_consultasDatosLogeoUsuario(?)', userName, function (err, result) {
                if (err) throw err;
                doResponse(result[0]);
            });
        });
    },
    loginProcess: async function loginProcess(_ref, res, next) {
        var body = _ref.body;
        var userName = body.userName,
            password = body.password;

        try {
            userMiddleware.getPasswordByUserName(userName, function (passWordFromDb) {
                // Getting the encrypted password from db.
                var succefullLogin = (0, _common.decrypt)(passWordFromDb[0].password) === password; // If the password typed matches
                if (succefullLogin) {
                    userMiddleware.getUserProperties(userName, function (userProperties) {
                        res.send({ auth: !!((0, _common.decrypt)(passWordFromDb[0].password) === password), userProperties: userProperties });
                    });
                    return;
                }
                _mysql2.default.res.status(401);
                res.send({ auth: false });
            });
        } catch (err) {
            console.log(err);
        }
        next();
    }
};

exports.default = userMiddleware;