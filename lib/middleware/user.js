'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mysql = require('../network/mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _network = require('../network');

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

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
    getPasswordByUserName: async function getPasswordByUserName(userName) {
        return await (0, _network.callSPWithCallback)('Call US_consultasPassword(?)', userName).then(function (dbResponse) {
            return dbResponse[0].password;
        });
    },
    getUserProperties: async function getUserProperties(userName) {
        return await (0, _network.callSPWithCallback)('Call US_consultasDatosLogeoUsuario(?)', userName).then(function (dbResponse) {
            return dbResponse[0];
        });
    },
    loginProcess: async function loginProcess(_ref, res, next) {
        var body = _ref.body;
        var userName = body.userName,
            password = body.password;

        try {
            return userMiddleware.getPasswordByUserName(userName).then(async function (passwordFromBd) {
                var matches = await _bcrypt2.default.compare(password, passwordFromBd);
                if (matches) {
                    return {
                        status: 200,
                        body: {
                            token: (0, _jsonwebtoken.sign)({ user: userName }, '{ user: userName }swincomc_20140512_siventas'),
                            userProperties: await userMiddleware.getUserProperties(userName)
                        }
                    };
                } else {
                    return {
                        status: 401,
                        body: {
                            message: 'Invalid credentials'
                        }
                    };
                }
            });
        } catch (err) {
            console.log(err);
        }
        next();
    }
};

exports.default = userMiddleware;