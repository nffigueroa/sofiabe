
import connection from './mysql';


/**
 * 
 * @param {*} storeProcedureNameAndParams Script in mysql calling the sp
 * @param  {...any} params All params that the query needs.
 */
export const callSPWithCallback = (storeProcedureNameAndParams, ...params) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query(storeProcedureNameAndParams, params, (err, results) => {
                if (err || !results) {
                    return reject(err);
                }
                resolve((results[0]));
            }) 
        })
        
    } catch (error) {
        throw error;
    }
}

export const callSPWithNotCallback = (storeProcedureNameAndParams, ...params) => {
    try {
        con.query(storeProcedureNameAndParams, params, (err, result) => {
            if (err) throw err;
        }) 
    } catch (error) {
        throw error;
    }
}