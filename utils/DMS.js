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

async function insertDisease(patient_ID,history_ID,disease_name){     
    var sqlCommand = [];
    var sql1 = "INSERT into `medical_history` (`history_ID`,`disease_name`) VALUE (?,?)";
    const inserts1 = [history_ID, disease_name];
    var sql2 = "INSERT into `medical_history_list` (`patient_ID`,`history_ID`) VALUE (?,?)";
    const inserts2 = [patient_ID, history_ID];
    sql1 = database.format(sql1,inserts1);
    sqlCommand.push(sql1);
    sql2 = database.format(sql2,inserts2);
    sqlCommand.push(sql2);
    try {
        await database.transaction(sqlCommand);
        return Promise.resolve("success insert")
    }
    catch(err){
        return Promise.reject(err)
    }
}


async function getDisease(history_ID){
    var sqlCommand = "SELECT * FROM `medical_history` WHERE `history_ID` = ?";
    const inserts = [history_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        const results = await database.query(sqlCommand);
        return Promise.resolve(results)
    }
    catch(err){
        return Promise.reject(err)
    }
}

async function updateDisease(history_ID, disease_name){
    var sqlCommand = "UPDATE `medical_history` SET `disease_name` = ? WHERE `history_ID` = ?";
    const inserts = [disease_name,history_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        await database.query(sqlCommand);
        return Promise.resolve("success update")
    }
    catch(err){
        return Promise.reject(err)
    }
}

async function deleteDisease(history_ID){
    var sqlCommand = "DELETE FROM `medical_history` WHERE `history_ID`=?";
    const inserts = [history_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        await database.query(sqlCommand);
        return Promise.resolve("success delete disease");
    }
    catch(err){
        return Promise.reject(err);
    }
}

module.exports = { getAllDiseases, insertDisease,getDisease,updateDisease,deleteDisease}