import con from '../network/mysql';
import { callSPWithCallback } from '../network';

import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';


const userMiddleware = {
    getUserById: (req, res, next) => {
        con.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('', [1], (err, result) => {
                res.send(JSON.stringify(result[0]));
            })
        })
    },
    getPasswordByUserName: async (userName) => {
        return await callSPWithCallback('Call US_consultasPassword(?)', userName).then(dbResponse => dbResponse[0].password)
    },
    getUserProperties: async (userName) => {
        return await callSPWithCallback('Call US_consultasDatosLogeoUsuario(?)',  userName).then(dbResponse => dbResponse[0])
    },
    loginProcess: async ({ body }, res, next) => {
        const { userName, password } = body;
        try {
            return userMiddleware.getPasswordByUserName(userName)
                .then(async (passwordFromBd) => {
                    const matches = await bcrypt.compare(password, passwordFromBd);
                    if (matches) {
                        return {
                            status: 200,
                            body: { 
                                token: sign({ user: userName }, '{ user: userName }swincomc_20140512_siventas'),
                                userProperties: await userMiddleware.getUserProperties(userName)
                            }
                        }
                    } else {
                        return {
                            status: 401,
                            body: {
                                message: 'Invalid credentials'
                            }
                        }
                    }
                })
        }
        catch (err) {
            console.log(err);
        }
        next();
    }
}

export default userMiddleware;