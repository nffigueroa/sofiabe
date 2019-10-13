import con from '../util/mysql';
import { decrypt } from '../util/common';


const userMiddleware = {
    getUserById: (req, res, next) => {
        con.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('', [1], (err, result) => {
                res.send(JSON.stringify(result[0]));
            })
        })
    },
    getPasswordByUserName: async(userName, doLogin) => {
        return con.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('Call US_consultasPassword(?)', userName, (err, result) => {
                if (err) throw err;
                doLogin(result[0])
            })
        })
    },
    getUserProperties: async(userName, doResponse) => {
        return con.getConnection((err, connection) => {
            connection.query('Call US_consultasDatosLogeoUsuario(?)', userName, (err, result) => {
                if (err) throw err;
                doResponse(result[0]);
            })
        })
    },
    loginProcess: async({body}, res , next) => {
        const {userName, password} = body;
        try {
         userMiddleware.getPasswordByUserName(userName, (passWordFromDb) =>  { // Getting the encrypted password from db.
            const succefullLogin = decrypt(passWordFromDb[0].password) === password; // If the password typed matches
            if (succefullLogin) {
                userMiddleware.getUserProperties(userName, (userProperties) => {
                    res.send({auth: !!(decrypt(passWordFromDb[0].password) === password), userProperties})
                })
                return;
            } 
            con.
            res.status(401);
            res.send({auth: false})
            
        })
    }
    catch(err){
        console.log(err);
    }
    next();
    }
}

export default userMiddleware;