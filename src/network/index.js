
import con from '../util/mysql';


/**
 * 
 * @param {*} storeProcedureNameAndParams Script in mysql calling the sp
 * @param {*} callback It will triggered once the query was done.
 * @param  {...any} params All params that the query needs.
 */
export const callSPWithCallback = (storeProcedureNameAndParams, callback = {}, ...params) => {
    try {
        con.query(storeProcedureNameAndParams, params, (err, result) => {
            if (err) throw err;
            callback(JSON.stringify(result[0]))
        }) 
    } catch (error) {
        throw error;
    }
}