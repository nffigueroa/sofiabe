
import connection from './mysql';


/**
 * 
 * @param {*} storeProcedureNameAndParams Script in mysql calling the sp
 * @param  {...any} params All params that the query needs.
 */
export const callSPWithCallback = (storeProcedureNameAndParams: any, ...params: any) => {
    try {
        return new Promise((resolve, reject) => {
            connection.query(storeProcedureNameAndParams, params, (err: any, results: any) => {
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

export const callSPWithNotCallback = (storeProcedureNameAndParams: any, ...params: any) => {
    try {
        connection.query(storeProcedureNameAndParams, params, (err: any, result: any) => {
            if (err) throw err;
        }) 
    } catch (error) {
        throw error;
    }
}