const database = require('./async-db.js')

async function getAllDiseases(patient_ID){
    var sqlCommand = "SELECT * FROM `medical_history` WHERE `history_ID` IN (SELECT `history_ID` FROM `medical_history_list` WHERE `patient_ID` = ?)";
    const inserts = [patient_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        const results = await database.query(sqlCommand);
        return Promise.resolve(results)
    }
    catch(err){
        return Promise.reject(err)
    }
}

function _uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

async function insertDisease(patient_ID,medical_name,hospital,medical_date,medical_instructions,medical_description){     
    var sqlCommand = [];
    var history_ID = _uuid()
    var sql1 = "INSERT into `medical_history` (`history_ID`,`medical_name`,`hospital`,`medical_date`,`medical_instructions`,`medical_description`) VALUE (?,?,?,?,?,?)";
    const inserts1 = [history_ID, medical_name, hospital, medical_date, medical_instructions, medical_description];
    var sql2 = "INSERT into `medical_history_list` (`patient_ID`,`history_ID`) VALUE (?,?)";
    const inserts2 = [patient_ID, history_ID];
    sql1 = database.format(sql1,inserts1);
    sqlCommand.push(sql1);
    sql2 = database.format(sql2,inserts2);
    sqlCommand.push(sql2);
    try {
        await database.transaction(sqlCommand);
        return {code:201,message:'history created successfully'}
    }
    catch(err){
        return Promise.reject(err)
    }
}

async function updateDisease(history_ID, medical_name,hospital,medical_date,medical_instructions,medical_description){
    var sqlCommand = "UPDATE `medical_history` SET `medical_name` = ?,`hospital` = ?,`medical_date` = ?,`medical_instructions` = ?,`medical_description` = ? WHERE `history_ID` = ?";
    const inserts = [ medical_name,hospital,medical_date,medical_instructions,medical_description,history_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        await database.query(sqlCommand);
        return {code:204,message:'history updated successfully'}
    }
    catch(err){
        return Promise.reject(err)
    }
}


async function modify (history_ID, field, value){
    try {
        let sql = "UPDATE `medical_history` SET ??=? WHERE `history_ID`=?"
        const inserts = [field, value, history_ID]
        sql = database.format(sql, inserts)
        results = await database.query(sql)
        return {code:204,message:'field updated successfully'}
    }
    catch (err) {
        return Promise.reject(err)
    }

}

async function deleteDisease(history_ID){
    var sqlCommand = "DELETE FROM `medical_history` WHERE `history_ID`=?";
    const inserts = [history_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        await database.query(sqlCommand);
        return {code:204,message:'history deleted successfully'}
    }
    catch(err){
        return Promise.reject(err);
    }
}

module.exports = { getAllDiseases, insertDisease,modify,deleteDisease,updateDisease}