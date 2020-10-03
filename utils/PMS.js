const database = require('./async-db.js')

async function getAllPatients(){
    var sqlCommand = "SELECT * FROM `patient`";
    const inserts = [];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        const results = await database.query(sqlCommand);
        return Promise.resolve(results)
    }
    catch(err){
        return Promise.reject(err)
    }
}

async function getPatient(patient_ID){
    var sqlCommand = "SELECT * FROM `patient `WHERE `patient_ID` = ?";
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

async function insertPatient(first_name, last_name, email, birth, gender,allergen){     
    var sql = "INSERT into `patient` (`first_name`,`last_name`,`email`,`birth`,`gender`,`allergen`) VALUE (?,?,?,?,?,?)";
    const inserts = [first_name, last_name, email, birth, gender,allergen];
    sqlCommand = database.format(sql,inserts);
    try {
        await database.query(sqlCommand);
        return Promise.resolve("success insert patient")
    }
    catch(err){
        return Promise.reject(err)
    }
}


async function updatePatient(patient_ID, first_name, last_name, email, birth, gender, allergen){
    var sqlCommand = "UPDATE `patient` SET `first_name` = ?,`last_name` = ?, `email` = ?, `birth` = ?,`gender` = ?,`allergen` = ? WHERE `patient_ID` = ?";
    const inserts = [first_name, last_name, email, birth, gender, allergen, patient_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        await database.query(sqlCommand);
        return Promise.resolve("success update patient")
    }
    catch(err){
        return Promise.reject(err)
    }
}

async function deletePatient(patient_ID){
    var sqlCommand = "DELETE FROM `patient` WHERE `patient_ID`=?";
    const inserts = [patient_ID];
    sqlCommand = database.format(sqlCommand, inserts);
    try {
        await database.query(sqlCommand);
        return Promise.resolve("success delete patient");
    }
    catch(err){
        return Promise.reject(err);
    }
}

module.exports = { getAllPatients,getPatient,insertPatient,updatePatient,deletePatient}